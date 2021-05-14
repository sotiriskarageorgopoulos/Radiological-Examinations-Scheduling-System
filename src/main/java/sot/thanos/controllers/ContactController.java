package sot.thanos.controllers;

import com.google.gson.GsonBuilder;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import sot.thanos.model.helping_classes.Contact;
import sot.thanos.model.helping_classes.DBConnection;
import spark.Request;
import spark.Response;

public class ContactController {
    public static String sendContactMsg(Request req, Response res) {
        res.type("application/json");
        Contact c = new GsonBuilder().create().fromJson(req.body(),Contact.class);
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> collection = db.getCollection("Contact");
        Document doc = new Document("RadiologicalDB","Contact")
                           .append("name",c.name)
                           .append("surname",c.surname)
                           .append("email",c.email)
                           .append("subject",c.subject)
                           .append("message",c.message);
        collection.insertOne(doc);
        return "{\"sended\":true}";
    }
}
