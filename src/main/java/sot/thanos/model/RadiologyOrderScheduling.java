package sot.thanos.model;

import java.util.Date;
import java.util.List;

public class RadiologyOrderScheduling {
    private String radiologyOrderCode;
    private Date sendingDate;
    private String justification;
    private List<RadiologicalOperation> radiologicalOperations;
    private Date executionDate;
    private ExaminationPriority priority;
    private String radiologistId;
    private PatientDetails patientDetails;

    public RadiologyOrderScheduling(String radiologyOrderCode, Date sendingDate, String justification, List<RadiologicalOperation> radiologicalOperations,
                                    Date executionDate, ExaminationPriority priority, PatientDetails patientDetails, String radiologistId) {
        this.radiologyOrderCode = radiologyOrderCode;
        this.sendingDate = sendingDate;
        this.justification = justification;
        this.radiologicalOperations = radiologicalOperations;
        this.executionDate = executionDate;
        this.priority = priority;
        this.radiologistId = radiologistId;
        this.patientDetails = patientDetails;
    }

    public PatientDetails getPatientDetails() {
        return this.patientDetails;
    }

    public String getRadiologistId() {
        return this.radiologistId;
    }

    public String getCode() {
        return this.radiologyOrderCode;
    }

    public Date getSendingDate() {
        return this.sendingDate;
    }

    public String getJustification() {
        return this.justification;
    }

    public List<RadiologicalOperation> getRadiologicalOperations() {
        return this.radiologicalOperations;
    }

    public Date getExecutionDate() {
        return this.executionDate;
    }

    public ExaminationPriority getPriority() {
        return this.priority;
    }

    public void setPatientDetails(PatientDetails patientDetails) {
        this.patientDetails = patientDetails;
    }

    public void setCode(String radiologyOrderCode) {
        this.radiologyOrderCode = radiologyOrderCode;
    }

    public void setSendingDate(Date sendingDate) {
        this.sendingDate = sendingDate;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public void setRadiologicalOperations(List<RadiologicalOperation> radiologicalOperations) {
        this.radiologicalOperations = radiologicalOperations;
    }

    public void setRadiologistId(String radiologistId) {
        this.radiologistId = radiologistId;
    }

    public void setExecutionDate(Date executionDate) {
        this.executionDate = executionDate;
    }

    public void setPriority(ExaminationPriority priority) {
        this.priority = priority;
    }
}
