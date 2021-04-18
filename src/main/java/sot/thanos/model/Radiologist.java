package sot.thanos.model;

import java.util.Date;

public class Radiologist extends Person {
    private String radiologistId;
    private String email;
    private String password;

    public Radiologist(String name, String surname, Gender gender, Date birthDate, String phoneNumber,
                       String mobileNumber, String address, String radiologistId, String email, String password) {
        super(name,surname,gender,birthDate,phoneNumber,mobileNumber,address);
        this.radiologistId = radiologistId;
        this.email = email;
        this.password = password;
    }

    public String getRadiologistId() {
        return this.radiologistId;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setRadiologistId(String radiologistId) {
        this.radiologistId = radiologistId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
