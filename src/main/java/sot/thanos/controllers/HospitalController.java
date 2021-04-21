package sot.thanos.controllers;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;
import sot.thanos.model.helping_classes.DBConnection;
import spark.Request;
import spark.Response;

public class HospitalController {
    public static String getHospitals(Request req, Response res) {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("Hospital");
        FindIterable<Document> findIterable = collection.find();
        MongoCursor<Document> cursor = findIterable.iterator();
        JSONArray hospitals = new JSONArray();
        while(cursor.hasNext()) {
            Document doc = cursor.next();
            JSONObject hospital = new JSONObject();
            hospital.put("hospitalId",doc.getString("hospitalId"));
            hospital.put("title",doc.getString("title"));
            hospital.put("category",doc.getString("category"));
            hospitals.put(hospital);
        }
        return hospitals.toString();
    }
}
