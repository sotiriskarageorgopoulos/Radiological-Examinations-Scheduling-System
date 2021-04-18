package sot.thanos.model;


import java.util.Date;

public class RadiologySecretary extends Person {
    private String secretaryId;
    private String email;
    private String password;

    public RadiologySecretary(String name, String surname, Gender gender, Date birthDate, String phoneNumber,
                              String mobileNumber, String address, String secretaryId, String email, String password) {
        super(name,surname,gender,birthDate,phoneNumber,mobileNumber,address);
        this.secretaryId = secretaryId;
        this.email = email;
        this.password = password;
    }

    public String getSecretaryId() {
        return this.secretaryId;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setSecretaryId(String secretaryId) {
        this.secretaryId = secretaryId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
