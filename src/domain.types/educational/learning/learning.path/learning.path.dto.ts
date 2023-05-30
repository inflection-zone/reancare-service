import { uuid } from "../../../miscellaneous/system.types";
import { CourseDto } from "../course/course.dto";

export interface LearningPathDto {
    id?                 : uuid,
    Name?               : string;
    Description?        : string;
    ImageUrl?           : string;
    DurationInDays?     : number;
    Courses?            : LearningCourseDto[];
    PreferenceWeight?   : number;
    Enabled?            : boolean;
    CreatedAt?          : Date;
    Sequence?           : number;
}

export interface LearningCourseDto {
    id?                 : uuid,
    Courses?            : CourseDto[];
}
