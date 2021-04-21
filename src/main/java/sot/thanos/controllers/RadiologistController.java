package sot.thanos.controllers;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;
import sot.thanos.model.helping_classes.DBConnection;
import spark.Request;
import spark.Response;
import java.util.*;
import java.util.stream.Collectors;

public class RadiologistController {
    public static String getRadiologistById(Request req, Response res) {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("Radiologist");
        String radiologistId = req.params(":radiologistId");
        FindIterable<Document> findIterable = collection.find(new BasicDBObject("radiologistId",radiologistId));
        MongoCursor<Document> cursor = findIterable.iterator();
        JSONObject radiologist = new JSONObject();
        while (cursor.hasNext()) {
            Document doc = cursor.next();
            radiologist.put("name",doc.getString("name"));
            radiologist.put("surname",doc.getString("surname"));
            radiologist.put("gender",doc.getString("gender"));
            radiologist.put("birthDate",doc.getDate("birthDate"));
            radiologist.put("phoneNumber",doc.getString("phoneNumber"));
            radiologist.put("mobileNumber",doc.getString("mobileNumber"));
            radiologist.put("address",doc.getString("address"));
            radiologist.put("radiologistId",doc.getString("radiologistId"));
            radiologist.put("email",doc.getString("email"));
            radiologist.put("password",doc.getString("password"));
        }
        return radiologist.toString();
    }

    public static String sortRadiologistsIdByAvailability (Request req, Response res){
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collectionRad = db.getCollection("Radiologist");
        MongoCollection<Document> collectionROS = db.getCollection("RadiologyOrderScheduling");
        FindIterable<Document> findIterableRad = collectionRad.find();
        MongoCursor<Document> radCursor = findIterableRad.iterator();
        Map<String,Long> radiologistsMap = new HashMap<>();
        while (radCursor.hasNext()) {
            Document doc = radCursor.next();
            long countOfROS = collectionROS
                    .count(Filters.eq("radiologistId",doc.getString("radiologistId")));
            radiologistsMap.put(doc.getString("radiologistId"),countOfROS);
        }

        radiologistsMap = radiologistsMap.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        return new JSONObject(radiologistsMap).toString();
    }

    public static String getRadiologicalOrdersForRadiologist(Request req,Response res) {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("RadiologyOrderScheduling");
        String radiologistId = req.params(":radiologistId");
        FindIterable<Document> findIterable = collection.find(new BasicDBObject("radiologistId",radiologistId));
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
            ros.put(obj);
        }
        return ros.toString();
    }

}
