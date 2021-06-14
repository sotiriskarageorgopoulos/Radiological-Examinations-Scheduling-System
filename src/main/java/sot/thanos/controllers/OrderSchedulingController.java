package sot.thanos.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONArray;
import org.json.JSONObject;
import sot.thanos.model.RadiologyOrderScheduling;
import sot.thanos.model.helping_classes.DBConnection;
import spark.Request;
import spark.Response;

import java.text.SimpleDateFormat;
import java.util.*;
import static com.mongodb.client.model.Updates.*;

public class OrderSchedulingController {

    public static String insRadiologicalOrderDetails(Request req, Response res) {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("RadiologyOrderScheduling");
        Gson gson = new Gson();
        RadiologyOrderScheduling ros = new GsonBuilder()
                                       .setDateFormat("yyyy-MM-dd")
                                       .create()
                                       .fromJson(req.body(),RadiologyOrderScheduling.class);
        Document patientDetails = new Document("name",ros.getPatientDetails().getName())
                                  .append("surname",ros.getPatientDetails().getSurname())
                                  .append("gender", String.valueOf(ros.getPatientDetails().getGender()))
                                  .append("birthDate",ros.getPatientDetails().getBirthDate())
                                  .append("phoneNumber",ros.getPatientDetails().getPhoneNumber())
                                  .append("mobileNumber",ros.getPatientDetails().getMobileNumber())
                                  .append("address", ros.getPatientDetails().getAddress())
                                  .append("patientCode", ros.getPatientDetails().getPatientCode())
                                  .append("fatherName", ros.getPatientDetails().getFatherName())
                                  .append("motherName", ros.getPatientDetails().getMotherName())
                                  .append("insuranceCode", ros.getPatientDetails().getInsuranceCode());
        Document doc = new Document("RadiologicalDB","RadiologyOrderScheduling")
                       .append("radiologyOrderCode",ros.getRadiologyOrderCode())
                       .append("sendingDate",ros.getSendingDate())
                       .append("justification",ros.getJustification())
                       .append("radiologicalOperations",gson.toJson(ros.getRadiologicalOperations()))
                       .append("executionDate",ros.getExecutionDate())
                       .append("priority", String.valueOf(ros.getPriority()))
                       .append("radiologistId", ros.getRadiologistId())
                       .append("patientDetails", patientDetails)
                       .append("doctorId", ros.getDoctorId());
        collection.insertOne(doc);
        return "{\"sended\":true}";
    }

    public static String getScheduledRadiologicalOrders(Request req, Response res) {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("RadiologyOrderScheduling");
        FindIterable<Document> findIterable = collection.find(new BasicDBObject("radiologistId",new BasicDBObject("$ne",null)));
        MongoCursor<Document> rosCursor = findIterable.iterator();
        Gson gson = new Gson();
        JSONArray ros = new JSONArray();
        while (rosCursor.hasNext()) {
            Document doc = rosCursor.next();
            JSONObject obj = new JSONObject();
            obj.put("radiologyOrderCode",doc.getString("radiologyOrderCode"));
            obj.put("sendingDate",doc.getDate("sendingDate"));
            obj.put("justification",doc.getString("justification"));
            obj.put("radiologicalOperations",gson.fromJson(doc.getString("radiologicalOperations"), ArrayList.class));
            obj.put("executionDate",doc.getDate("executionDate"));
            obj.put("priority",doc.getString("priority"));
            obj.put("radiologistId",doc.getString("radiologistId"));
            obj.put("patientDetails",doc.get("patientDetails"));
            obj.put("doctorId",doc.getString("doctorId"));
            ros.put(obj);
        }
        return ros.toString();
    }

    public static String getRadiologicalOrder(Request req, Response res) {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        String radiologyOrderCode = req.params(":radiologyOrderCode");
        System.out.println(radiologyOrderCode);
        MongoCollection<Document> collection = db.getCollection("RadiologyOrderScheduling");
        FindIterable<Document> findIterable = collection.find(new BasicDBObject("radiologyOrderCode",radiologyOrderCode));
        MongoCursor<Document> rosCursor = findIterable.iterator();
        Gson gson = new Gson();
        JSONArray ros = new JSONArray();
        while (rosCursor.hasNext()) {
            Document doc = rosCursor.next();
            JSONObject obj = new JSONObject();
            obj.put("radiologyOrderCode",doc.getString("radiologyOrderCode"));
            obj.put("sendingDate",doc.getDate("sendingDate"));
            obj.put("justification",doc.getString("justification"));
            obj.put("radiologicalOperations",gson.fromJson(doc.getString("radiologicalOperations"), ArrayList.class));
            obj.put("executionDate",doc.getDate("executionDate"));
            obj.put("priority",doc.getString("priority"));
            obj.put("radiologistId",doc.getString("radiologistId"));
            obj.put("patientDetails",doc.get("patientDetails"));
            obj.put("doctorId",doc.getString("doctorId"));
            ros.put(obj);
        }
        return ros.toString();
    }

    public static String getRadiologicalOrders(Request req,Response res) {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("RadiologyOrderScheduling");
        FindIterable<Document> findIterable = collection.find(new BasicDBObject("radiologistId",null));
        MongoCursor<Document> rosCursor = findIterable.iterator();
        Gson gson = new Gson();
        JSONArray ros = new JSONArray();
        while (rosCursor.hasNext()) {
            Document doc = rosCursor.next();
            JSONObject obj = new JSONObject();
            obj.put("radiologyOrderCode",doc.getString("radiologyOrderCode"));
            obj.put("sendingDate",doc.getDate("sendingDate"));
            obj.put("justification",doc.getString("justification"));
            obj.put("radiologicalOperations",gson.fromJson(doc.getString("radiologicalOperations"), ArrayList.class));
            obj.put("executionDate",doc.getDate("executionDate"));
            obj.put("priority",doc.getString("priority"));
            obj.put("radiologistId",doc.getString("radiologistId"));
            obj.put("patientDetails",doc.get("patientDetails"));
            obj.put("doctorId",doc.getString("doctorId"));
            ros.put(obj);
        }
        return ros.toString();
    }

    public static String scheduleRadiologyOrder(Request req, Response res) {
        res.type("application/json");
        String patientCode = req.params(":patientCode");
        RadiologyOrderScheduling ros = new GsonBuilder()
                                    .setDateFormat("yyyy-MM-dd'T'HH:mm")
                                    .create()
                                    .fromJson(req.body(),RadiologyOrderScheduling.class);
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("RadiologyOrderScheduling");
        Bson updates = combine(set("radiologistId",ros.getRadiologistId()),set("executionDate",ros.getExecutionDate()));
        collection.updateOne(new BasicDBObject("patientDetails.patientCode",patientCode),updates);
        return "{\"sended\":true}";
    }

    public static String getRadiologyOperations(Request req,Response res) {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("RadiologyOperations");
        FindIterable<Document> findIterable = collection.find();
        MongoCursor<Document> cursor = findIterable.iterator();
        JSONArray radiologyOperations = new JSONArray();
        while (cursor.hasNext()) {
            Document doc = cursor.next();
            JSONObject obj = new JSONObject();
            obj.put("name",doc.getString("name"));
            obj.put("category",doc.getString("category"));
            radiologyOperations.put(obj);
        }
        return radiologyOperations.toString();
    }

    public static String deleteTheOldAppointments(Request req,Response res) {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("RadiologyOrderScheduling");
        FindIterable<Document> findIterable = collection.find();
        MongoCursor<Document> cursor = findIterable.iterator();
        SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        String dateTimeNow = sdformat.format(new Date());
        while(cursor.hasNext()) {
            Document doc = cursor.next();
            String appointmentDateTime = sdformat.format(doc.getDate("executionDate"));
            if(dateTimeNow.compareTo(appointmentDateTime) > 0) collection.deleteOne(Filters.eq("radiologyOrderCode",doc.getString("radiologyOrderCode")));
        }
        return "{\"checked\": true}";
    }

}
