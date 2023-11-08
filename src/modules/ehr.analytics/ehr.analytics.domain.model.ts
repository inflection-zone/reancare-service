import { Gender, uuid } from "../../domain.types/miscellaneous/system.types";
import { DataTypes, EHRRecordTypes } from "./ehr.record.types";

export interface EHRDynamicRecordDomainModel {
    AppName?      : string;
    PatientUserId?: uuid;
    RecordId?     : uuid;
    Type          : EHRRecordTypes;
    Name          : string;

    ValueInt?     : number;
    ValueFloat?   : number;
    ValueString?  : string;
    ValueBoolean? : boolean;
    ValueDate?    : Date;
    ValueDataType?: DataTypes;
    ValueName?    : string;
    ValueUnit?    : string;

    TimeStamp? : Date;
    RecordDate?: string;
}

export interface EHRStaticRecordDomainModel {
    AppName?            : string;
    DoctorPersonId?     : uuid;
    OtherDoctorPersonId?: uuid;
    ProviderCode?       : string;
    HealthSystem?       : string;
    AssociatedHospital? : string;
    Gender?             : Gender;
    SelfIdentifiedGender?: string;
    BirthDate?          : Date;
    Age?                : string;
    BodyHeight?         : number;
    Ethnicity?          : string;
    Race?               : string;
    Nationality?        : string;
    HasHeartAilment?    : boolean;
    HasHighBloodPressure?: boolean;
    HasHighCholesterol?: boolean;
    Occupation?        : string;
    IsDiabetic?         : boolean;
    MaritalStatus?      : string;
    BloodGroup?         : string;
    MajorAilment?       : string;
    IsSmoker?           : boolean;
    Location?           : string;
    OtherConditions?     : string;
}
