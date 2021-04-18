package sot.thanos.model;

import java.util.Date;
import java.util.List;

public class RadiologyOrderScheduling {
    private String code;
    private Date sendingDate;
    private String justification;
    private List<RadiologicalOperation> radiologicalOperations;
    private Date executionDate;
    private ExaminationPriority priority;

    public RadiologyOrderScheduling(String code, Date sendingDate, String justification, List<RadiologicalOperation> radiologicalOperations,
                                    Date executionDate, ExaminationPriority priority) {
        this.code = code;
        this.sendingDate = sendingDate;
        this.justification = justification;
        this.radiologicalOperations = radiologicalOperations;
        this.executionDate = executionDate;
        this.priority = priority;
    }

    public String getCode() {
        return this.code;
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

    public void setCode(String code) {
        this.code = code;
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

    public void setExecutionDate(Date executionDate) {
        this.executionDate = executionDate;
    }

    public void setPriority(ExaminationPriority priority) {
        this.priority = priority;
    }
}
