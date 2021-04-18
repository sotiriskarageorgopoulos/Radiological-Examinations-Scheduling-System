package sot.thanos.model;

import java.util.Date;

public class PatientDetails extends Person {
    private String code;
    private String fatherName;
    private String motherName;
    private String insuranceCode;

    public PatientDetails(String name, String surname, Gender gender, Date birthDate, String phoneNumber,
                          String mobileNumber, String address, String code, String fatherName, String motherName, String insuranceCode) {
        super(name,surname,gender,birthDate,phoneNumber,mobileNumber,address);
        this.code = code;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.insuranceCode = insuranceCode;
    }

    public String getCode() {
        return this.code;
    }

    public String getFatherName() {
        return this.fatherName;
    }

    public String getMotherName() {
        return this.motherName;
    }

    public String getInsuranceCode() {
        return this.insuranceCode;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public void setInsuranceCode(String insuranceCode) {
        this.insuranceCode = insuranceCode;
    }
}
