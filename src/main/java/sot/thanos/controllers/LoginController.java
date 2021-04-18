package sot.thanos.controllers;

import com.google.gson.GsonBuilder;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import sot.thanos.model.helping_classes.DBConnection;
import sot.thanos.model.helping_classes.Login;
import sot.thanos.security.Cryptography;
import spark.Request;
import spark.Response;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class LoginController {
    public static String login(Request req, Response res) throws IllegalBlockSizeException,
            InvalidKeyException, BadPaddingException, NoSuchAlgorithmException, NoSuchPaddingException {
        Login l = new GsonBuilder().create().fromJson(req.body(),Login.class);
        String password = l.password;
        String email = l.email;
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> doctorCollection = db.getCollection("Doctor");
        MongoCollection<Document> radiologistCollection = db.getCollection("Radiologist");
        MongoCollection<Document> secretaryCollection = db.getCollection("Secretary");
        FindIterable<Document> doctors = doctorCollection.find();
        FindIterable<Document> radiologists = radiologistCollection.find();
        FindIterable<Document> secretaries = secretaryCollection.find();

        MongoCursor<Document> doctorsCursor = doctors.iterator();
        while(doctorsCursor.hasNext()) {
            Document doc = doctorsCursor.next();
            String decryptedPassword = Cryptography.decrypt(doc.getString("password"));
            if(email.equals(doc.getString("email")) && password.equals(decryptedPassword)) return "{\"login\":true}";
        }

        MongoCursor<Document> radiologistsCursor = radiologists.iterator();
        while(radiologistsCursor.hasNext()) {
            Document doc = radiologistsCursor.next();
            String decryptedPassword = Cryptography.decrypt(doc.getString("password"));
            if(email.equals(doc.getString("email")) && password.equals(decryptedPassword)) return "{\"login\":true}";
        }

        MongoCursor<Document> secretariesCursor = secretaries.iterator();
        while(secretariesCursor.hasNext()) {
            Document doc = secretariesCursor.next();
            String decryptedPassword = Cryptography.decrypt(doc.getString("password"));
            if(email.equals(doc.getString("email")) && password.equals(decryptedPassword)) return "{\"login\":true}";
        }

        return "{\"login\":false}";
    }
}
