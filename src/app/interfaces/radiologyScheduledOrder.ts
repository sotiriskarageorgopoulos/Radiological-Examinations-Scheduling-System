import { PatientDetails } from "./patientDetails";
import { Priority } from "../enums/priority";
import { RadiologicalOperation } from "./radiologicalOperation";
export interface RadiologyScheduledOrder {
    radiologyOrderCode: string,
    sendingDate: Date,
    justification: string,
    radiologicalOperations: Array<RadiologicalOperation>,
    priority: Priority,
    radiologistId: string,
    doctorId: string,
    patientDetails: PatientDetails,
    executionDate: string
}