import { RadiologicalOperation } from "./radiologicalOperation";
import { PatientDetails } from "./patientDetails";
import { Priority } from "../enums/priority";
export interface RadiologyOrderScheduling {
    radiologyOrderCode: string,
    sendingDate: Date,
    justification: string,
    radiologicalOperations: Array<RadiologicalOperation>,
    executionDate: Date,
    priority: Priority,
    radiologistId: string,
    doctorId: string,
    patientDetails: PatientDetails
}