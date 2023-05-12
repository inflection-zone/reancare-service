import { Op } from 'sequelize';
import { ApiError } from '../../../../../common/api.error';
import { Logger } from '../../../../../common/logger';
import { IStatisticsRepo } from '../../../../repository.interfaces/statistics/statistics.repo.interface';
import Person from '../../models/person/person.model';
import Patient from '../../models/users/patient/patient.model';
import { Helper } from '../../../../../common/helper';
import HealthProfile from '../../models/users/patient/health.profile.model';
import UserLoginSession from '../../models/users/user/user.login.session.model';
import UserDeviceDetails from '../../models/users/user/user.device.details.model';
import CareplanEnrollment from '../../models/clinical/careplan/enrollment.model';

///////////////////////////////////////////////////////////////////////

export class StatisticsRepo implements IStatisticsRepo {

    getTotalUsers = async (filters): Promise<any> => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const search: any = { where: {}, include: [] };

            const includesObj =
            {
                model    : Person,
                required : true,
                where    : {
                    
                },
            };
     
            includesObj.where['Phone'] = {
                [Op.notBetween] : [1000000000, 1000000100],
            };
            includesObj.where['DeletedAt'] = {
                [Op.eq] : null
            };

            if (filters.Year != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
          
            search.include.push(includesObj);
    
            const totalUsers = await Patient.findAndCountAll(search);

            return totalUsers;
            
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getDeletedUsers = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);
            const { minDate, maxDate } = getMinMaxDates(filters);
            const search: any = { where: {}, include: [],  paranoid: false };

            const includesObj =
            {
                model    : Person,
                required : true,
                where    : {},
                paranoid : false
            };

            includesObj.where['Phone'] = {
                [Op.notBetween] : [1000000000, 1000000100],
            };

            includesObj.where['DeletedAt'] = {
                [Op.not] : null
            };
     
            if (filters.Year != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
            
            search.include.push(includesObj);
    
            const deletedUsers = await Patient.findAndCountAll(search);

            const deletedUsersRatio =  ((deletedUsers.count) / (totalUsers.count) * 100).toFixed(2);
    
            const  deletedUsersDetails = {
                Count : deletedUsers.count,
                Ratio : deletedUsersRatio
            };
    
            return deletedUsersDetails;
            
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getActiveUsers = async (filters): Promise<any> => {
        try {
            const totalUsers_ = await this.getTotalUsers(filters);
            const totalUsers  = totalUsers_.rows.map(x => x.UserId);

            const loginSessions = [];
            for (const u of totalUsers) {
                const loginSession = await UserLoginSession.findOne({ where : {
                    UserId    : u,
                    ValidTill : { [Op.gte]: new Date() },
                } });
                loginSessions.push(loginSession);
            }
    
            const activeUsersFromLoginSession = loginSessions.filter(x => x != null);

            const activeUsersRatio = ((activeUsersFromLoginSession.length) / (totalUsers_.count) * 100).toFixed(2);
    
            const  _activeUsers = {
                Count : activeUsersFromLoginSession.length,
                Ratio : activeUsersRatio,
            };

            const  activeUsers = {
                ActiveUsers : _activeUsers
            };
    
            return activeUsers;
    
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getGenderWiseUsers = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);
        
            const totalUsers_ = totalUsers.rows.map(x => x.Person.Gender);

            const totalMaleUsers = totalUsers_.filter(x => x === "Male");
    
            const maleUsersRatio = ((totalMaleUsers.length) / (totalUsers.count) * 100).toFixed(2);
    
            const maleUsers = {
                Count : totalMaleUsers.length,
                Ratio : maleUsersRatio,
            };

            const totalFemaleUsers = totalUsers_.filter(x => x === "Female");
            const femaleUsersRatio = ((totalFemaleUsers.length) / (totalUsers.count) * 100).toFixed(2);
    
            const femaleUsers = {
                Count : totalFemaleUsers.length,
                Ratio : femaleUsersRatio,
            };

            const totalIntersexUsers = totalUsers_.filter(x => x === "Intersex");
            const IntersexUsersRatio = ((totalIntersexUsers.length) / (totalUsers.count) * 100).toFixed(2);
    
            const intersexUsers = {
                Count : totalIntersexUsers.length,
                Ratio : IntersexUsersRatio,
            };

            const totalGenderNotSpecifiedUsers = totalUsers_.filter(x => x === "Other" || x === "Unknown" );

            const genderNotSpecifiedUsersRatio =
            ((totalGenderNotSpecifiedUsers.length) / (totalUsers.count) * 100).toFixed(2);

            const genderNotSpecifiedUsers = {
                Count : totalGenderNotSpecifiedUsers.length,
                Ratio : genderNotSpecifiedUsersRatio,
            };
    
            const genderWiseUsers = {
                MaleUsers               : maleUsers,
                FemaleUsers             : femaleUsers,
                IntersexUsers           : intersexUsers,
                GenderNotSpecifiedUsers : genderNotSpecifiedUsers
            };
    
            return genderWiseUsers;
    
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAgeWiseUsers = async (filters): Promise<any> => {
        try {
            const totalUsers_ = await this.getTotalUsers(filters);
            const totalUsers = totalUsers_.rows.map(x => x.Person.BirthDate);

            const usersWithBirthDate = totalUsers.filter(x => x != null);

            const totalAgeNotSpecifiedUsers = (totalUsers.length) - (usersWithBirthDate.length);

            const ageNotSpecifiedUsersRatio = ((totalAgeNotSpecifiedUsers) / (totalUsers_.count) * 100).toFixed(2);
    
            const ageNotSpecifiedUsers = {
                Count : totalAgeNotSpecifiedUsers,
                Ratio : ageNotSpecifiedUsersRatio,
            };

            const totalUsresWithAge = [];
            
            for ( const u of usersWithBirthDate ) {
                var userAge = Helper.getAgeFromBirthDate(u, true);
                var usrAge = userAge.split(" ");
                const user = Number(usrAge[0]);
                totalUsresWithAge.push(user);
            }

            var usersBetweenTwoNumbers = {};
            
            if (filters.AgeFrom != null && filters.AgeTo != null) {
                const totalUsersBetweenTwoNumbers =
                    totalUsresWithAge.filter(x => x > filters.AgeFrom && x < filters.AgeTo);
                const usersBetweenTwoNumbersRatio =
                    ((totalUsersBetweenTwoNumbers.length) / (totalUsers_.count) * 100).toFixed(2);

                usersBetweenTwoNumbers = {
                    Count : totalUsersBetweenTwoNumbers.length,
                    Ratio : usersBetweenTwoNumbersRatio,
                };
            }
       
            const totalUsersBelowThirtyfive = totalUsresWithAge.filter(x => x <= 35);
            const usersBelowThirtyfiveRatio = ((totalUsersBelowThirtyfive.length) / (totalUsers_.count) * 100).toFixed(2);
    
            const usersBelowThirtyfive = {
                Count : totalUsersBelowThirtyfive.length,
                Ratio : usersBelowThirtyfiveRatio,
            };

            const totalUsersBetweenThirtysixToSeventy = totalUsresWithAge.filter(x => x >= 36 && x <= 70);

            const usersBetweenThirtysixToSeventyRatio =
            ((totalUsersBetweenThirtysixToSeventy.length) / (totalUsers_.count) * 100).toFixed(2);
    
            const usersBetweenThirtysixToSeventy = {
                Count : totalUsersBetweenThirtysixToSeventy.length,
                Ratio : usersBetweenThirtysixToSeventyRatio,
            };

            const totalUsersAboveSeventy = totalUsresWithAge.filter(x => x >= 71);
            const usersAboveSeventyRatio =
            ((totalUsersAboveSeventy.length) / (totalUsers_.count) * 100).toFixed(2);
    
            const usersAboveSeventy = {
                Count : totalUsersAboveSeventy.length,
                Ratio : usersAboveSeventyRatio,
            };
    
            const ageWiseUsers = {
                UsersBelowThirtyfive           : usersBelowThirtyfive,
                UsersBetweenThirtysixToSeventy : usersBetweenThirtysixToSeventy,
                UsersAboveSeventy              : usersAboveSeventy,
                UsersBetweenTwoNumbers         : usersBetweenTwoNumbers,
                AgeNotSpecifiedUsers           : ageNotSpecifiedUsers,
            };
    
            return ageWiseUsers;
    
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersByMaritalStatus = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);

            const healthProfileDetails = [];
            for (const u of totalUsers.rows) {
                const healthProfileDetail = await HealthProfile.findOne({ where : {
                    PatientUserId : u.UserId,
                } });
                healthProfileDetails.push(healthProfileDetail);
            }
            
            const totalHealthProfileUsers = healthProfileDetails.map(x => x.MaritalStatus);
            const marriedUsers = totalHealthProfileUsers.filter(x => x === "Married");
            const singleUsers = totalHealthProfileUsers.filter(x => x === "Single");
            const divorcedUsers = totalHealthProfileUsers.filter(x => x === "Divorced");
            const widowedUsers = totalHealthProfileUsers.filter(x => x === "Widowed");
            const statusNotSpecifiedUsers = totalHealthProfileUsers.filter(x => x === "Unknown");

            const  marriedUsersDetails = {
                status : "Married",
                count  : marriedUsers.length
            };

            const  singleUsersDetails = {
                status : "Single",
                count  : singleUsers.length
            };

            const  divorcedUsersDetails = {
                status : "Divorced",
                count  : divorcedUsers.length
            };

            const widowedUsersDetails = {
                status : "Widowed",
                count  : widowedUsers.length
            };

            const statusNotSpecifiedUsersDetails = {
                status : "Not Specified",
                count  : statusNotSpecifiedUsers.length
            };
    
            const  maritalStatusWiseUsers =
                [marriedUsersDetails,
                    singleUsersDetails,
                    divorcedUsersDetails,
                    widowedUsersDetails,
                    statusNotSpecifiedUsersDetails];
               
            return maritalStatusWiseUsers;
    
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getDeviceDetailWiseUsers = async (filters): Promise<any> => {
        try {
            const _totalUsers = await this.getTotalUsers(filters);

            const totalUsers  = _totalUsers.rows.map(x => x.UserId);

            const deviceDetails = [];
            for (const u of totalUsers) {
                const deviceDetail = await UserDeviceDetails.findOne({ where : {
                    UserId : u,
                } });
                deviceDetails.push(deviceDetail);
            }

            const deviceDatilUsers = deviceDetails.filter(x => x !== null);

            const androidUsers = deviceDatilUsers.filter(x => x.OSType === 'Android');

            const androidUsersRatio = ((androidUsers.length) / (_totalUsers.count) * 100).toFixed(2);

            const iOSUsers = deviceDatilUsers.filter(x => x.OSType === 'iOS');

            const iOSUsersRatio = ((iOSUsers.length) / (_totalUsers.count) * 100).toFixed(2);

            const deviceDetailNotSpecifiedUsers = deviceDetails.filter(x => x === null);

            const deviceDetailNotSpecifiedUsersRatio =
             ((deviceDetailNotSpecifiedUsers.length) / (_totalUsers.count) * 100).toFixed(2);

            const  androidUsersDetails = {
                Count : androidUsers.length,
                Ratio : androidUsersRatio
            };

            const  iOSUsersDetails = {
                Count : iOSUsers.length,
                Ratio : iOSUsersRatio
            };
            
            const  deviceDetailNotSpecifiedUsersDetails = {
                Count : deviceDetailNotSpecifiedUsers.length,
                Ratio : deviceDetailNotSpecifiedUsersRatio
            };

            const  deviceDetailsWiseUsers = {
                AndroidUsers         : androidUsersDetails,
                IOSUsers             : iOSUsersDetails,
                MissingDeviceDetails : deviceDetailNotSpecifiedUsersDetails
            };
    
            return deviceDetailsWiseUsers;
            
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getEnrollmentUsers = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);

            const enrollmentDetails = [];
            for (const u of totalUsers.rows) {
                const enrollmentDetail = await CareplanEnrollment.findOne({ where : {
                    PatientUserId : u.UserId,
                } });
                enrollmentDetails.push(enrollmentDetail);
            }

            const totalEnrollnemtUsers = enrollmentDetails.filter(x => x !== null);

            const totalEnrollnemtUsersRatio =
             ((totalEnrollnemtUsers.length) / (totalUsers.count) * 100).toFixed(2);

            const  totalEnrollnemtUsersDetails = {
                Count : totalEnrollnemtUsers.length,
                Ratio : totalEnrollnemtUsersRatio,
            };

            const  enrollmentUsers = {
                TotalEnrollnemtUsers : totalEnrollnemtUsersDetails
            };
    
            return enrollmentUsers;
            
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

}

function getMinMaxDates(filters) {
    const minDate = new Date();
    minDate.setUTCFullYear(filters.Year, 0, 1);
    minDate.setUTCHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setUTCFullYear(filters.Year, 11, 31);
    maxDate.setUTCHours(0, 0, 0, 0);

    return { minDate, maxDate };
}
