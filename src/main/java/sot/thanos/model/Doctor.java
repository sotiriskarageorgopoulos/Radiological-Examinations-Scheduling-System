package sot.thanos.model;


import java.util.Date;

public class Doctor extends Person{
    private String doctorId;
    private String email;
    private String password;
    private String hospitalId;

    public Doctor(String name, String surname, Gender gender, Date birthDate, String phoneNumber,
                  String mobileNumber, String address, String doctorId, String email, String password, String hospitalId) {
        super(name,surname,gender,birthDate,phoneNumber,mobileNumber,address);
        this.doctorId = doctorId;
        this.email = email;
        this.password = password;
        this.hospitalId = hospitalId;
    }

    public String getDoctorId() {
        return this.doctorId;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getHospitalId() {
        return this.hospitalId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setHospitalId(String hospitalId) {
        this.hospitalId = hospitalId;
    }
}
