package sot.thanos.model;
import java.time.LocalDateTime;
import java.util.Date;

public class Person {
    private String name;
    private String surname;
    private Gender gender;
    private Date birthDate;
    private String phoneNumber;
    private String mobileNumber;
    private String address;

    public Person(String name,String surname,Gender gender,Date birthDate,String phoneNumber,
                  String mobileNumber,String address) {
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.mobileNumber = mobileNumber;
        this.address = address;
    }

     public String getName() {
        return this.name;
     }

     public String getSurname() {
        return this.surname;
     }

     public Gender getGender() {
        return this.gender;
     }

     public Date getBirthDate() {
        return this.birthDate;
     }

     public String getPhoneNumber() {
        return this.phoneNumber;
     }

     public String getMobileNumber() {
        return this.mobileNumber;
     }

     public String getAddress() {
        return this.address;
     }

     public void setName(String name) {
        this.name = name;
     }

     public void setSurname(String surname) {
        this.surname = surname;
     }

     public void setGender(Gender gender) {
        this.gender = gender;
     }

     public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
     }

     public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
     }

     public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
     }

     public void setAddress(String address) {
        this.address = address;
     }
}
