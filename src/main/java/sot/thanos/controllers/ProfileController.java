package sot.thanos.controllers;

import com.google.gson.GsonBuilder;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.conversions.Bson;
import sot.thanos.model.Doctor;
import sot.thanos.model.Radiologist;
import sot.thanos.model.RadiologySecretary;
import sot.thanos.model.helping_classes.DBConnection;
import org.bson.Document;
import sot.thanos.security.Cryptography;
import spark.Request;
import spark.Response;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import static com.mongodb.client.model.Updates.combine;
import static com.mongodb.client.model.Updates.set;

public class ProfileController {
    public static String updateProfile(Request req, Response res) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        MongoDatabase db = DBConnection.connectToDB();
        MongoCollection<Document> doctorCol = db.getCollection("Doctor");
        MongoCollection<Document> secretaryCol = db.getCollection("Secretary");
        MongoCollection<Document> radiologistCol = db.getCollection("Radiologist");

        String category = req.params(":category");
        if(category.equals("Doctor")) {
            Doctor doctor = new GsonBuilder().create().fromJson(req.body(), Doctor.class);
            Bson updateProfile = combine(set("name",doctor.getName()),
                                         set("surname",doctor.getSurname()),
                                         set("phoneNumber",doctor.getPhoneNumber()),
                                         set("mobileNumber",doctor.getMobileNumber()),
                                         set("email",doctor.getEmail()),
                                         set("password",Cryptography.encrypt(doctor.getPassword())),
                                         set("address",doctor.getAddress()));
            doctorCol.updateOne(new BasicDBObject("doctorId",doctor.getDoctorId()),updateProfile);
            return "{\"sended\":true}";
        }
        else if(category.equals("Secretary")) {
            RadiologySecretary secretary = new GsonBuilder().create().fromJson(req.body(), RadiologySecretary.class);
            Bson updateSecretary = combine(set("name",secretary.getName()),
                                           set("surname",secretary.getSurname()),
                                           set("phoneNumber",secretary.getPhoneNumber()),
                                           set("mobileNumber",secretary.getMobileNumber()),
                                           set("email",secretary.getEmail()),
                                           set("password",Cryptography.encrypt(secretary.getPassword())),
                                           set("address",secretary.getAddress()));
            secretaryCol.updateOne(new BasicDBObject("secretaryId",secretary.getSecretaryId()),updateSecretary);
            return "{\"sended\":true}";
        }
        else if(category.equals("Radiologist")) {
            Radiologist radiologist = new GsonBuilder().create().fromJson(req.body(), Radiologist.class);
            Bson updateRadiologist = combine(set("name",radiologist.getName()),
                                           set("surname",radiologist.getSurname()),
                                           set("phoneNumber",radiologist.getPhoneNumber()),
                                           set("mobileNumber",radiologist.getMobileNumber()),
                                           set("email",radiologist.getEmail()),
                                           set("password",Cryptography.encrypt(radiologist.getPassword())),
                                           set("address",radiologist.getAddress()));
            radiologistCol.updateOne(new BasicDBObject("radiologistId",radiologist.getRadiologistId()),updateRadiologist);
            return "{\"sended\":true}";
        }
        return "{\"sended\":false}";
    }
}
