package sot.thanos.model.helping_classes;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.logging.Level;
import java.util.logging.Logger;

public class DBConnection {
    private final static Logger LOGGER = Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);
    private static Dotenv dotenv = Dotenv.load();

    public static MongoDatabase connectToDB() {
        String conAddress = dotenv.get("CONNECTION_STRING");
        MongoClientURI uri = new MongoClientURI(conAddress);
        MongoClient client = new MongoClient(uri);
        MongoDatabase db = client.getDatabase("RadiologicalDB");
        LOGGER.log(Level.INFO,"Connected to Mongo DB Atlas...");
        return db;
    }
}
