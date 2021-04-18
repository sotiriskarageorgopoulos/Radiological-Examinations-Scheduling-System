package sot.thanos.controllers;

import com.google.gson.GsonBuilder;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import sot.thanos.model.*;
import sot.thanos.model.helping_classes.DBConnection;
import sot.thanos.security.Cryptography;
import spark.Request;
import spark.Response;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class RegisterController {

    public static String register(Request req, Response res) throws IllegalBlockSizeException,
            InvalidKeyException, BadPaddingException, NoSuchAlgorithmException, NoSuchPaddingException {
        res.type("application/json");
        MongoDatabase db = DBConnection.connectToDB();
        String category = req.params(":category");
        if(category.equals("Doctor")) {
            MongoCollection<Document> collection = db.getCollection("Doctor");
            Doctor doctor = new GsonBuilder().setDateFormat("yyyy-MM-dd")
                            .create().fromJson(req.body(),Doctor.class);
            Document doc = new Document("RadiologicalDB","Doctor")
                        .append("name",doctor.getName())
                        .append("surname",doctor.getSurname())
                        .append("gender", String.valueOf(doctor.getGender()))
                        .append("birthDate",doctor.getBirthDate())
                        .append("phoneNumber",doctor.getPhoneNumber())
                        .append("mobileNumber",doctor.getMobileNumber())
                        .append("address",doctor.getAddress())
                        .append("doctorId",doctor.getDoctorId())
                        .append("email",doctor.getEmail())
                        .append("password",Cryptography.encrypt(doctor.getPassword()))
                        .append("hospitalId",doctor.getHospitalId());
            collection.insertOne(doc);
            return "{ \"sended\":true}";
        }
        else if(category.equals("Radiologist")) {
            MongoCollection<Document> collection = db.getCollection("Radiologist");
            Radiologist radiologist = new GsonBuilder().setDateFormat("yyyy-MM-dd")
                                      .create().fromJson(req.body(),Radiologist.class);
            Document doc = new Document("RadiologicalDB","Radiologist")
                    .append("name",radiologist.getName())
                    .append("surname",radiologist.getSurname())
                    .append("gender", String.valueOf(radiologist.getGender()))
                    .append("birthDate",radiologist.getBirthDate())
                    .append("phoneNumber",radiologist.getPhoneNumber())
                    .append("mobileNumber",radiologist.getMobileNumber())
                    .append("address",radiologist.getAddress())
                    .append("radiologistId",radiologist.getRadiologistId())
                    .append("email",radiologist.getEmail())
                    .append("password",Cryptography.encrypt(radiologist.getPassword()));
            collection.insertOne(doc);
            return "{ \"sended\":true}";
        }
        else if(category.equals("Secretary")) {
            MongoCollection<Document> collection = db.getCollection("Secretary");
            RadiologySecretary radiologist = new GsonBuilder().setDateFormat("yyyy-MM-dd")
                                           .create().fromJson(req.body(), RadiologySecretary.class);
            Document doc = new Document("RadiologicalDB","Secretary")
                    .append("name",radiologist.getName())
                    .append("surname",radiologist.getSurname())
                    .append("gender", String.valueOf(radiologist.getGender()))
                    .append("birthDate",radiologist.getBirthDate())
                    .append("phoneNumber",radiologist.getPhoneNumber())
                    .append("mobileNumber",radiologist.getMobileNumber())
                    .append("address",radiologist.getAddress())
                    .append("secretaryId",radiologist.getSecretaryId())
                    .append("email",radiologist.getEmail())
                    .append("password",Cryptography.encrypt(radiologist.getPassword()));
            collection.insertOne(doc);
            return "{ \"sended\":true}";
        }
        return "{ \"sended\":false}";
    }
}
