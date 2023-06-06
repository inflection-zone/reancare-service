import { Op } from 'sequelize';
import { CountryCurrencyPhone } from 'country-currency-phone';
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
import { AppDownloadDomainModel } from '../../../../../domain.types/statistics/app.download.domain.model';
import { AppDownloadDto } from '../../../../../domain.types/statistics/app.download.dto';
import AppDownloadsModel from '../../models/statistics/app.downloads.model';
import { AppDownloadMapper } from '../../mappers/statistics/app.download.mapper';
import BodyHeight from '../../models/clinical/biometrics/body.height.model';
import BodyWeight from '../../models/clinical/biometrics/body.weight.model';
import PhysicalActivity from '../../models/wellness/exercise/physical.activity.model';
import Medication from '../../models/clinical/medication/medication.model';
import Meditation from '../../models/wellness/exercise/meditation.model';
import Symptom from '../../models/clinical/symptom/symptom.model';
import FoodConsumption from '../../models/wellness/nutrition/food.consumption.model';
import WaterConsumption from '../../models/wellness/nutrition/water.consumption.model';
import BloodCholesterol from '../../models/clinical/biometrics/blood.cholesterol.model';
import BloodGlucose from '../../models/clinical/biometrics/blood.glucose.model';
import BloodOxygenSaturation from '../../models/clinical/biometrics/blood.oxygen.saturation.model';
import BloodPressure from '../../models/clinical/biometrics/blood.pressure.model';
import BodyTemperature from '../../models/clinical/biometrics/body.temperature.model';
import Pulse from '../../models/clinical/biometrics/pulse.model';
import { TimeHelper } from '../../../../../common/time.helper';
import User from '../../models/users/user/user.model';
import Role from '../../models/role/role.model';
import Doctor from '../../models/users/doctor.model';
import EmergencyContact from '../../models/users/patient/emergency.contact.model';

///////////////////////////////////////////////////////////////////////

export class StatisticsRepo implements IStatisticsRepo {

    getTotalUsers = async (filters): Promise<any> => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const maxCreatedDate = getMaxDate(filters);
            const search: any = { where: {}, include: [], paranoid: false };

            const includesObj =
            {
                model    : Person,
                required : true,
                where    : {
                    
                },
                paranoid : false
            };
     
            includesObj.where['Phone'] = {
                [Op.notBetween] : [1000000000, 1000000100],
            };
         
            if (filters.Year != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }

            if (filters.Year != null && filters.Month != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.lt] : maxCreatedDate,
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

    getNonDeletedUsers = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);
            const { minDate, maxDate } = getMinMaxDates(filters);
            const maxCreatedDate = getMaxDate(filters);
            const search: any = { where: {}, include: [], paranoid: false };

            const includesObj =
            {
                model    : Person,
                required : true,
                where    : {
                    
                },
                paranoid : false
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

            if (filters.Year != null && filters.Month != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.lt] : maxCreatedDate,
                };
            }

            search.include.push(includesObj);

            const nonDeletedUsers = await Patient.findAndCountAll(search);

            const nonDeletedUsersRatio =  ((nonDeletedUsers.count) / (totalUsers.count) * 100).toFixed(2);
    
            const  nonDeletedUsersDetails = {
                Count : nonDeletedUsers.count,
                Ratio : nonDeletedUsersRatio
            };
    
            return nonDeletedUsersDetails;
            
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersCount = async (filters): Promise<any> => {
        try {
            const totalUsers_ = await this.getTotalUsers(filters);
            const totalUsers = {
                Count : totalUsers_.count
            };
            const nonDeletedUsers = await this.getNonDeletedUsers(filters);
            const activeUsers = await this.getActiveUsers(filters);
            const deletedUsers = await this.getDeletedUsers(filters);
            const enrollmentUsers = await this.getUsersByEnrollment(filters);

            const usersData = {
                TotalUsers      : totalUsers,
                NonDeletedUsers : nonDeletedUsers,
                ActiveUsers     : activeUsers,
                DeletedUsers    : deletedUsers,
                EnrollmentUsers : enrollmentUsers.TotalEnrollnemtUsers,
            };

            return usersData;
            
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getDeletedUsers = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);
            const { minDate, maxDate } = getMinMaxDates(filters);
            const maxCreatedDate = getMaxDate(filters);
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

            if (filters.Year != null && filters.Month != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.lt] : maxCreatedDate,
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
    
            const  activeUsers = {
                Count : activeUsersFromLoginSession.length,
                Ratio : activeUsersRatio,
            };

            return activeUsers;
    
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };
    
    getUsersByRole = async (filters): Promise<any> => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const maxCreatedDate = getMaxDate(filters);
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
     
            if (filters.Year != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }

            if (filters.Year != null && filters.Month != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.lt] : maxCreatedDate,
                };
            }
            
            search.include.push(includesObj);
    
            const allUsers = await User.findAndCountAll(search);

            const allRoles = await Role.findAndCountAll();

            const userRoles = [];

            for (const u of allUsers.rows) {
                const userRole = u.RoleId;
                userRoles.push(userRole);
            }

            const userRoleDetails = [];

            for (const r of allRoles.rows) {
                const roles = userRoles.filter(x => x === r.id);
                const ratio = ((roles.length) / (allUsers.count) * 100).toFixed(2);
                const userRoleDetail = {
                    Role  : r.RoleName,
                    Count : roles.length,
                    Ratio : ratio,
                };
                userRoleDetails.push(userRoleDetail);
            }

            return userRoleDetails;
    
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersByGender = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);
        
            const totalUsers_ = totalUsers.rows.map(x => x.Person.Gender);

            const totalMaleUsers = totalUsers_.filter(x => x === "Male");
    
            const maleUsersRatio = ((totalMaleUsers.length) / (totalUsers.count) * 100).toFixed(2);
    
            const maleUsers = {
                Status : "Male",
                Count  : totalMaleUsers.length,
                Ratio  : maleUsersRatio,
            };

            const totalFemaleUsers = totalUsers_.filter(x => x === "Female");
            const femaleUsersRatio = ((totalFemaleUsers.length) / (totalUsers.count) * 100).toFixed(2);
    
            const femaleUsers = {
                Status : "Female",
                Count  : totalFemaleUsers.length,
                Ratio  : femaleUsersRatio,
            };

            const totalIntersexUsers = totalUsers_.filter(x => x === "Intersex");
            const IntersexUsersRatio = ((totalIntersexUsers.length) / (totalUsers.count) * 100).toFixed(2);
    
            const intersexUsers = {
                Status : "Intersex",
                Count  : totalIntersexUsers.length,
                Ratio  : IntersexUsersRatio,
            };

            const totalGenderNotSpecifiedUsers = totalUsers_.filter(x => x === "Other" || x === "Unknown" );

            const genderNotSpecifiedUsersRatio =
            ((totalGenderNotSpecifiedUsers.length) / (totalUsers.count) * 100).toFixed(2);

            const genderNotSpecifiedUsers = {
                Status : "Not Specified",
                Count  : totalGenderNotSpecifiedUsers.length,
                Ratio  : genderNotSpecifiedUsersRatio,
            };
    
            const genderWiseUsers = [
                maleUsers,
                femaleUsers,
                intersexUsers,
                genderNotSpecifiedUsers
            ];
    
            return genderWiseUsers;
    
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersByAge = async (filters): Promise<any> => {
        try {
            const totalUsers_ = await this.getTotalUsers(filters);
            const totalUsers = totalUsers_.rows.map(x => x.Person.BirthDate);

            const usersWithBirthDate = totalUsers.filter(x => x != null);

            const totalAgeNotSpecifiedUsers = (totalUsers.length) - (usersWithBirthDate.length);

            const ageNotSpecifiedUsersRatio = ((totalAgeNotSpecifiedUsers) / (totalUsers_.count) * 100).toFixed(2);
    
            const ageNotSpecifiedUsers = {
                Status : 'Not Specified',
                Count  : totalAgeNotSpecifiedUsers,
                Ratio  : ageNotSpecifiedUsersRatio,
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
                Status : 'Below 35',
                Count  : totalUsersBelowThirtyfive.length,
                Ratio  : usersBelowThirtyfiveRatio,
            };

            const totalUsersBetweenThirtysixToSeventy = totalUsresWithAge.filter(x => x >= 36 && x <= 70);

            const usersBetweenThirtysixToSeventyRatio =
            ((totalUsersBetweenThirtysixToSeventy.length) / (totalUsers_.count) * 100).toFixed(2);
    
            const usersBetweenThirtysixToSeventy = {
                Status : '36 to 70',
                Count  : totalUsersBetweenThirtysixToSeventy.length,
                Ratio  : usersBetweenThirtysixToSeventyRatio,
            };

            const totalUsersAboveSeventy = totalUsresWithAge.filter(x => x >= 71);
            const usersAboveSeventyRatio =
            ((totalUsersAboveSeventy.length) / (totalUsers_.count) * 100).toFixed(2);
    
            const usersAboveSeventy = {
                Status : 'Above 71',
                Count  : totalUsersAboveSeventy.length,
                Ratio  : usersAboveSeventyRatio,
            };
    
            const ageWiseUsers = [
                usersBelowThirtyfive,
                usersBetweenThirtysixToSeventy,
                usersAboveSeventy,
                ageNotSpecifiedUsers,
            ];
    
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
                }, paranoid : false } );
                healthProfileDetails.push(healthProfileDetail);
            }

            const totalHealthProfileUsers_ = healthProfileDetails.filter(x => x !== null);
            const totalHealthProfileUsers = totalHealthProfileUsers_.map(x => x.MaritalStatus);
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

    getUsersByDeviceDetail = async (filters): Promise<any> => {
        try {
            const _totalUsers = await this.getTotalUsers(filters);

            const totalUsers  = _totalUsers.rows.map(x => x.UserId);

            const deviceDetails = [];
            for (const u of totalUsers) {
                const deviceDetail = await UserDeviceDetails.findOne({ where : {
                    UserId : u,
                }, paranoid : false });
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

    getUsersByEnrollment = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);

            const enrollmentDetails = [];
            for (const u of totalUsers.rows) {
                const enrollmentDetail = await CareplanEnrollment.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                enrollmentDetails.push(enrollmentDetail);
            }

            const totalEnrollnemtUsers = enrollmentDetails.filter(x => x !== null);

            const totalEnrollnemtUsersRatio =
             ((totalEnrollnemtUsers.length) / (totalUsers.count) * 100).toFixed(2);

            const deviceDetails = [];
            for (const u of totalEnrollnemtUsers) {
                const deviceDetail  = await UserDeviceDetails.findOne({ where : {
                    UserId : u.PatientUserId,
                } });
                deviceDetails.push(deviceDetail);
            }

            const deviceDatilUsers = deviceDetails.filter(x => x !== null);

            const androidUsers = deviceDatilUsers.filter(x => x.OSType === 'Android');

            const androidUsersRatio = ((androidUsers.length) / (totalEnrollnemtUsers.length) * 100).toFixed(2);

            const iOSUsers = deviceDatilUsers.filter(x => x.OSType === 'iOS');

            const iOSUsersRatio = ((iOSUsers.length) / (totalEnrollnemtUsers.length) * 100).toFixed(2);

            const  androidUsersDetails = {
                Count : androidUsers.length,
                Ratio : androidUsersRatio
            };

            const  iOSUsersDetails = {
                Count : iOSUsers.length,
                Ratio : iOSUsersRatio
            };
            const  totalEnrollnemtUsersDetails = {
                Count : totalEnrollnemtUsers.length,
                Ratio : totalEnrollnemtUsersRatio,
            };

            const  enrollmentUsers = {
                TotalEnrollnemtUsers : totalEnrollnemtUsersDetails,
                AndroidUsers         : androidUsersDetails,
                IOSUsers             : iOSUsersDetails,
            };
    
            return enrollmentUsers;
            
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    updateAppDownloadCount = async (createModel: AppDownloadDomainModel):
    Promise<AppDownloadDto> => {

        try {
            const entity = {
                AppName          : createModel.AppName,
                TotalDownloads   : createModel.TotalDownloads,
                IOSDownloads     : createModel.IOSDownloads,
                AndroidDownloads : createModel.AndroidDownloads,
            };

            const download = await AppDownloadsModel.create(entity);
            return await AppDownloadMapper.toDto(download);
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAppDownlodCount= async (): Promise<any> => {
        try {
            const appDownload = await AppDownloadsModel.findAndCountAll();
            return appDownload;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersByCountry = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);

            const usersCountryCodes = [];
            for (const u of totalUsers.rows) {
                var phone = u.Person.Phone;
                const countryCode = phone.split("-")[0];
                usersCountryCodes.push(countryCode);
            }
        
            const countryCurrencyPhone = new CountryCurrencyPhone();

            const  usersCountries = [];
            for (const c of usersCountryCodes) {
                const countryArray =  countryCurrencyPhone.getByPhoneCode(c);
                let country  = undefined;
                for (const a of countryArray){
                    country = a.country.names[0];
                }
                usersCountries.push(country);
            }

            var uniqueContries = Array.from(new Set(usersCountries));

            const countryWiseUsers = [];

            for (const c of uniqueContries) {
                const countryUsers = usersCountries.filter(x => x === c);
                const ratio = ((countryUsers.length) / (totalUsers.count) * 100).toFixed(2);
                const countryUsersDetail = {
                    Country : c,
                    Count   : countryUsers.length,
                    Ratio   : ratio,
                };
                countryWiseUsers.push(countryUsersDetail);
            }

            return countryWiseUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersByMajorAilment = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);

            const healthProfileDetails = [];
            for (const u of totalUsers.rows) {
                const healthProfileDetail = await HealthProfile.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                healthProfileDetails.push(healthProfileDetail);
            }
            
            const totalMajorAilment_ = healthProfileDetails.filter(x => x !== null);
            const totalMajorAilment = totalMajorAilment_.map(x => x.MajorAilment);
            const majorAilments = totalMajorAilment.filter(x => x !== '');

            const majorAilmentNotSpecified = (totalMajorAilment.length) - (majorAilments.length);
            const ratio = ((majorAilmentNotSpecified) / (totalUsers.count) * 100).toFixed(2);

            const majorAilmentDetail = {
                MajorAilment : "Not Specified",
                Count        : majorAilmentNotSpecified,
                Ratio        : ratio,
            };

            const uniqueMajorAilment = Array.from(new Set(majorAilments));

            const majorAilmentDistributionOfUsers = [];

            for (const m of uniqueMajorAilment) {
                const majorAilment = majorAilments.filter(x => x === m);
                const ratio = ((majorAilment.length) / (totalUsers.count) * 100).toFixed(2);
                const majorAilmentDetail = {
                    MajorAilment : m,
                    Count        : majorAilment.length,
                    Ratio        : ratio,
                };
                majorAilmentDistributionOfUsers.push(majorAilmentDetail);
            }

            majorAilmentDistributionOfUsers.push(majorAilmentDetail);
            return majorAilmentDistributionOfUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersByObesity = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);

            const heightDetails = [];
            for (const u of totalUsers.rows) {
                const heightDetail = await BodyHeight.findOne({ where : {
                    PatientUserId : u.UserId,
                } });
                if (heightDetail !== null){
                    heightDetails.push(heightDetail);
                }
            }
            
            const weightDetails = [];
            for (const u of totalUsers.rows) {
                const weightDetail = await BodyWeight.findOne({ where : {
                    PatientUserId : u.UserId,
                } });
                if (weightDetail !== null){
                    weightDetails.push(weightDetail);
                }
            }

            const heightWeightArray = [];

            for (const x of heightDetails) {
                for (const y of weightDetails) {
                    if (x.PatientUserId === y.PatientUserId) {
                        heightWeightArray.push({
                            bodyHeight  : x.BodyHeight ?? null,
                            heightUnits : x.Unit ?? null,
                            bodyWeight  : y.BodyWeight ?? null,
                            weightUnits : y.unit ?? null,
                        });
                    }
                }
            }

            const usresBmi = [];
            for (const u of heightWeightArray) {
                const bmi = Helper.calculateBMI(u.bodyHeight, u.heightUnits, u.bodyWeight, u.weightUnits);
                usresBmi.push((bmi.bmi).toFixed(2));
            }

            const underWeight = usresBmi.filter(x => x < 18.5);
            const healthy  = usresBmi.filter(x => x >= 18.5 && x <= 24.9);
            const overWeight  = usresBmi.filter(x => x >= 25 && x <= 29.9);
            const obese  = usresBmi.filter(x => x >= 30);

            const underWeightUsers = {
                Status : "Under Weight",
                Count  : underWeight.length
            };

            const healthyUsers = {
                Status : "Healthy",
                Count  : healthy.length
            };

            const overWeightUsers = {
                Status : "Over Weight",
                Count  : overWeight.length
            };

            const obeseUsers = {
                Status : "Obese",
                Count  : obese.length
            };

            const obesityUsers = [underWeightUsers, healthyUsers, overWeightUsers, obeseUsers];

            return obesityUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersByAddiction = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);

            const healthProfileDetails = [];
            for (const u of totalUsers.rows) {
                const healthProfileDetail = await HealthProfile.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                healthProfileDetails.push(healthProfileDetail);
            }
            
            const totalHealthProfileUsers = healthProfileDetails.filter(x => x !== null);

            const tobaccoSmokers = totalHealthProfileUsers.filter(x => x.TobaccoQuestionAns === true);

            const heavyDrinkers = totalHealthProfileUsers.filter(x => x.IsDrinker === true && x.DrinkingSeverity === 'High');

            const substanceAbuse = totalHealthProfileUsers.filter(x => x.SubstanceAbuse === true);

            const nonAddicted  = totalHealthProfileUsers.filter(
                x => x.SubstanceAbuse === false &&
                x.IsDrinker === false &&
                (x.TobaccoQuestionAns === false) || (x.TobaccoQuestionAns === null));

            const tobaccoSmokersRatio =  ((tobaccoSmokers.length) / (totalUsers.count) * 100).toFixed(2);

            const heavyDrinkersRatio =  ((heavyDrinkers.length) / (totalUsers.count) * 100).toFixed(2);

            const substanceAbuseRatio =  ((substanceAbuse.length) / (totalUsers.count) * 100).toFixed(2);

            const nonAddictedRatio =  ((nonAddicted.length) / (totalUsers.count) * 100).toFixed(2);

            const tobaccoSmokerUsers = {
                Status : "Tobacco Smokers",
                Count  : tobaccoSmokers.length,
                Ratio  : tobaccoSmokersRatio
            };

            const heavyDrinkerUsers = {
                Status : "Heavy Drinker",
                Count  : heavyDrinkers.length,
                Ratio  : heavyDrinkersRatio
            };

            const substanceAbuseUsers = {
                Status : "Substance Abuse",
                Count  : substanceAbuse.length,
                Ratio  : substanceAbuseRatio
            };

            const nonAddictedUsers = {
                Status : "Non Addicted",
                Count  : nonAddicted.length,
                Ratio  : nonAddictedRatio
            };

            const addictionDetails = [
                tobaccoSmokerUsers,
                heavyDrinkerUsers,
                substanceAbuseUsers,
                nonAddictedUsers
            ];
           
            return addictionDetails;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersByHealthPillar = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);

            const physicalActivityUsers = await this.getPhysicalActivityUsers(totalUsers, filters);

            const meditationUsers = await this.getMeditationUsers(totalUsers, filters);

            const medicationUsers = await this.getMedicationUsers(totalUsers, filters);

            const symptomUsers = await this.getSymptomUsers(totalUsers, filters);

            const labRecordUsers = await this.getLabRecordUsers(totalUsers, filters);

            const nutritionUsers = await this.getNutritionUsers(totalUsers, filters);

            const vitalUsers = await this.getVitalUsers(totalUsers);

            let healthPillarDistribution = {} || [];

            if (filters.Year === null) {
                healthPillarDistribution =
                [
                    physicalActivityUsers,
                    meditationUsers,
                    medicationUsers,
                    symptomUsers,
                    labRecordUsers,
                    nutritionUsers,
                    vitalUsers
                ];
   
            }
            else {
                healthPillarDistribution =
                {
                    PhysicalActivityUsers : physicalActivityUsers,
                    MeditationUsers       : meditationUsers,
                    MedicationUsers       : medicationUsers,
                    SymptomUsers          : symptomUsers,
                    LabRecordUsers        : labRecordUsers,
                    NutritionUsers        : nutritionUsers,
                };
            }
           
            return healthPillarDistribution;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersStats = async (filters): Promise<any> => {
        try {
            const persons = await this.getPersons(filters);

            const users = await this.getUsers(filters);

            const admins = await this.getAdmins(filters);

            const doctors = await this.getDoctors(filters);

            const totalPatients = await this.getTotalUsers(filters);

            const nonDetetedPatients = await this.getNonDeletedUsers(filters);

            const detetedPatients = await this.getDeletedUsers(filters);

            const enrollments = await this.getEnrollments(filters);

            const emergencyContacts  = await this.getEmergencyContacts(filters);

            const paitents = {
                TotalPatients      : totalPatients.count,
                NonDetetedPatients : nonDetetedPatients,
                DetetedPatients    : detetedPatients,
            };

            const usersStats = {
                Persons           : persons,
                Users             : users,
                Admins            : admins,
                Doctors           : doctors,
                Paitents          : paitents,
                Enrollments       : enrollments,
                EmergencyContacts : emergencyContacts
            };

            return usersStats;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getUsersByBiometrics = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);
            let biometricUsers = {} || [] ;

            const cholesterolUsers = await this.getCholestrolUsers(totalUsers, filters);

            const glucoseUsers = await this.getGlucoseUsers(totalUsers, filters);

            const oxygenSaturationUsers = await this.getOxygenSaturationUsers(totalUsers, filters);

            const bloodPressureUsers = await this.getBloodPressureUsers(totalUsers, filters);

            const bodyHeightUsers = await this.getBodyHeightUsers(totalUsers, filters);

            const bodyWeightUsers = await this.getBodyWeightUsers(totalUsers, filters);

            const bodyTempratureUsers = await this.getBodyTempratureUsers(totalUsers, filters);

            const pulseUsers = await this.getPulseUsers(totalUsers, filters);

            if (filters.Year != null) {
                biometricUsers = {
                    CholesterolUsers      : cholesterolUsers,
                    GlucoseUsers          : glucoseUsers,
                    OxygenSaturationUsers : oxygenSaturationUsers,
                    BloodPressureUsers    : bloodPressureUsers,
                    BodyHeightUsers       : bodyHeightUsers,
                    BodyWeightUsers       : bodyWeightUsers ,
                    BodyTempratureUsers   : bodyTempratureUsers,
                    PulseUsers            : pulseUsers,
                };
            }

            else {
                biometricUsers =
                [
                    cholesterolUsers,
                    glucoseUsers,
                    oxygenSaturationUsers,
                    bloodPressureUsers,
                    bodyHeightUsers,
                    bodyWeightUsers,
                    bodyTempratureUsers,
                    pulseUsers
                ];
            }
  
            return biometricUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    // #private region

    private  getPhysicalActivityUsers = async (totalUsers, filters) => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const physicalActivityDetails = [];
            var physicalActivityUsers = {};

            if (filters.Year != null)  {
                for (const u of totalUsers.rows) {
                    const physicalActivityDetail = await PhysicalActivity.findOne({ where : {
                        PatientUserId : u.UserId,
                        CreatedAt     : {
                            [Op.between] : [minDate, maxDate],
                        }
                    }, paranoid : false });
                    if (physicalActivityDetail !== null){
                        physicalActivityDetails.push(physicalActivityDetail);
                    }
                }

                physicalActivityUsers = getMonthlyUsers(physicalActivityDetails,totalUsers);

            }
            else
            {
                for (const u of totalUsers.rows) {
                    const physicalActivityDetail = await PhysicalActivity.findOne({ where : {
                        PatientUserId : u.UserId,
                    }, paranoid : false });
                    if (physicalActivityDetail !== null){
                        physicalActivityDetails.push(physicalActivityDetail);
                    }
                }

                const physicalActivityUsersRatio =
                ((physicalActivityDetails.length) / (totalUsers.count) * 100).toFixed(2);
    
                physicalActivityUsers = {
                    Status : "Physical Activity",
                    Count  : physicalActivityDetails.length,
                    Ratio  : physicalActivityUsersRatio
                };
            
            }

            return physicalActivityUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getMeditationUsers = async (totalUsers, filters) => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const meditationDetails = [];
            let meditationUsers = {};

            if (filters.Year != null)  {
                for (const u of totalUsers.rows) {
                    const meditationDetail = await Meditation.findOne({ where : {
                        PatientUserId : u.UserId,
                        CreatedAt     : {
                            [Op.between] : [minDate, maxDate],
                        }
                    }, paranoid : false });
                    if (meditationDetail !== null){
                        meditationDetails.push(meditationDetail);
                    }
                }
                meditationUsers = getMonthlyUsers(meditationDetails,totalUsers);
            }
            else {
                for (const u of totalUsers.rows) {
                    const meditationDetail = await Meditation.findOne({ where : {
                        PatientUserId : u.UserId,
                    }, paranoid : false });
                    if (meditationDetail !== null){
                        meditationDetails.push(meditationDetail);
                    }
                }
    
                const meditationUsersRatio =
                ((meditationDetails.length) / (totalUsers.count) * 100).toFixed(2);
    
                meditationUsers = {
                    Status : "Meditation",
                    Count  : meditationDetails.length,
                    Ratio  : meditationUsersRatio
                };
            }
        
            return meditationUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getMedicationUsers = async (totalUsers, filters) => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const medicationDetails = [];
            let medicationUsers = {};

            if (filters.Year != null)  {
                for (const u of totalUsers.rows) {
                    const medicationDetail = await Medication.findOne({ where : {
                        PatientUserId : u.UserId,
                        CreatedAt     : {
                            [Op.between] : [minDate, maxDate],
                        }
                    }, paranoid : false });
                    if (medicationDetail !== null){
                        medicationDetails.push(medicationDetail);
                    }
                }
                medicationUsers = getMonthlyUsers(medicationDetails,totalUsers);
            }

            else {
                for (const u of totalUsers.rows) {
                    const medicationDetail = await Medication.findOne({ where : {
                        PatientUserId : u.UserId,
                    }, paranoid : false });
                    if (medicationDetail !== null){
                        medicationDetails.push(medicationDetail);
                    }
                }
    
                const medicationUsersRatio =
                ((medicationDetails.length) / (totalUsers.count) * 100).toFixed(2);
    
                medicationUsers = {
                    Status : "Medication",
                    Count  : medicationDetails.length,
                    Ratio  : medicationUsersRatio
                };
            }

            return medicationUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getSymptomUsers = async (totalUsers, filters) => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const symptomDetails = [];
            let symptomUsers = {};

            if (filters.Year != null)
            {
                for (const u of totalUsers.rows) {
                    const symptomDetail = await Symptom.findOne({ where : {
                        PatientUserId : u.UserId,
                        CreatedAt     : {
                            [Op.between] : [minDate, maxDate],
                        }
                    }, paranoid : false });
                    if (symptomDetail !== null){
                        symptomDetails.push(symptomDetail);
                    }
                }

                symptomUsers = getMonthlyUsers(symptomDetails,totalUsers);

            }

            else {
                for (const u of totalUsers.rows) {
                    const symptomDetail = await Symptom.findOne({ where : {
                        PatientUserId : u.UserId,
                    }, paranoid : false });
                    if (symptomDetail !== null){
                        symptomDetails.push(symptomDetail);
                    }
                }
    
                const symptomUsersRatio =
                ((symptomDetails.length) / (totalUsers.count) * 100).toFixed(2);
    
                symptomUsers = {
                    Status : "Symptoms",
                    Count  : symptomDetails.length,
                    Ratio  : symptomUsersRatio
                };
            }
            return symptomUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getLabRecordUsers = async (totalUsers, filters) => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const labRecordDetails = [];
            let labRecordUsers = {};

            if (filters.Year != null)
            {
                for (const u of totalUsers.rows) {
                    const labRecordDetail = await Symptom.findOne({ where : {
                        PatientUserId : u.UserId,
                        CreatedAt     : {
                            [Op.between] : [minDate, maxDate],
                        }
                    }, paranoid : false });
                    if (labRecordDetail !== null){
                        labRecordDetails.push(labRecordDetail);
                    }
                }
                labRecordUsers = getMonthlyUsers(labRecordDetails,totalUsers);
            }

            else {
                for (const u of totalUsers.rows) {
                    const labRecordDetail = await Symptom.findOne({ where : {
                        PatientUserId : u.UserId,
                    }, paranoid : false });
                    if (labRecordDetail !== null){
                        labRecordDetails.push(labRecordDetail);
                    }
                }
    
                const labRecordRatio =
                ((labRecordDetails.length) / (totalUsers.count) * 100).toFixed(2);
    
                labRecordUsers = {
                    Status : "Lab Record",
                    Count  : labRecordDetails.length,
                    Ratio  : labRecordRatio
                };
            }

            return labRecordUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getNutritionUsers = async (totalUsers, filters) => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const nutritionDetails = [];
            let nutritionUsers = {};

            if (filters.Year != null) {
                for (const u of totalUsers.rows) {
                    const foodConsumptionDetail = await FoodConsumption.findOne({ where : {
                        PatientUserId : u.UserId,
                        CreatedAt     : {
                            [Op.between] : [minDate, maxDate],
                        }
                    }, paranoid : false });
                    if (foodConsumptionDetail !== null){
                        nutritionDetails.push(foodConsumptionDetail);
                    }
                }
    
                for (const u of totalUsers.rows) {
                    const waterConsumptionDetail = await WaterConsumption.findOne({ where : {
                        PatientUserId : u.UserId,
                        CreatedAt     : {
                            [Op.between] : [minDate, maxDate],
                        }
                    }, paranoid : false });
                    if (waterConsumptionDetail !== null){
                        nutritionDetails.push(waterConsumptionDetail);
                    }
                }

                const uniqueNutritionUsers = getUniqueUsers(nutritionDetails);
            
                nutritionUsers = getMonthlyUsers(uniqueNutritionUsers,totalUsers);

            }
            
            else {
                for (const u of totalUsers.rows) {
                    const foodConsumptionDetail = await FoodConsumption.findOne({ where : {
                        PatientUserId : u.UserId,
                    }, paranoid : false });
                    if (foodConsumptionDetail !== null){
                        nutritionDetails.push(foodConsumptionDetail);
                    }
                }
    
                for (const u of totalUsers.rows) {
                    const waterConsumptionDetail = await WaterConsumption.findOne({ where : {
                        PatientUserId : u.UserId,
                    }, paranoid : false });
                    if (waterConsumptionDetail !== null){
                        nutritionDetails.push(waterConsumptionDetail);
                    }
                }
            
                const uniqueNutrition =  Array.from(new Set(nutritionDetails.map((x) => x.PatientUserId)));
                
                const nutritionRatio =
                ((uniqueNutrition.length) / (totalUsers.count) * 100).toFixed(2);
    
                nutritionUsers = {
                    Status : "Nutrition",
                    Count  : uniqueNutrition.length,
                    Ratio  : nutritionRatio
                };
            }

            return nutritionUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getVitalUsers = async (totalUsers ) => {
        try {
            const vitalDetails = [];
            let vitalsUsers = {};

            for (const u of totalUsers.rows) {
                const cholestrolDetail = await BloodCholesterol.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (cholestrolDetail !== null){
                    vitalDetails.push(cholestrolDetail);
                }
            }
    
            for (const u of totalUsers.rows) {
                const glucoseDetail = await BloodGlucose.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (glucoseDetail !== null){
                    vitalDetails.push(glucoseDetail);
                }
            }
    
            for (const u of totalUsers.rows) {
                const oxygenSaturationDetail = await BloodOxygenSaturation.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (oxygenSaturationDetail !== null){
                    vitalDetails.push(oxygenSaturationDetail);
                }
            }
    
            for (const u of totalUsers.rows) {
                const bloodPressureDetail = await BloodPressure.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (bloodPressureDetail !== null){
                    vitalDetails.push(bloodPressureDetail);
                }
            }
    
            for (const u of totalUsers.rows) {
                const bodyHeightDetail = await BodyHeight.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (bodyHeightDetail !== null){
                    vitalDetails.push(bodyHeightDetail);
                }
            }
    
            for (const u of totalUsers.rows) {
                const bodyWeightDetail = await BodyWeight.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (bodyWeightDetail !== null){
                    vitalDetails.push(bodyWeightDetail);
                }
            }
    
            for (const u of totalUsers.rows) {
                const bodyTempratureDetail = await BodyTemperature.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (bodyTempratureDetail !== null){
                    vitalDetails.push(bodyTempratureDetail);
                }
            }
        
            for (const u of totalUsers.rows) {
                const pulseDetail = await Pulse.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (pulseDetail !== null){
                    vitalDetails.push(pulseDetail);
                }
            }
            const uniqueVitalsDetails = Array.from(new Set(vitalDetails.map((x) => x.PatientUserId)));
    
            const vitalsRatio =
                ((uniqueVitalsDetails.length) / (totalUsers.count) * 100).toFixed(2);
    
            vitalsUsers = {
                Status : "Vitals",
                Count  : uniqueVitalsDetails.length,
                Ratio  : vitalsRatio
            };

            return vitalsUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getPersons = async (filters) => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const search: any = { where: {}, paranoid: false };

            search.where['Phone'] = {
                [Op.notBetween] : [1000000000, 1000000100],
            };

            search.where['DeletedAt'] = {
                [Op.eq] : null
            };
        
            if (filters.Year != null)  {
                search.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
    
            const nonDeletedPersons = await Person.findAndCountAll(search);

            search.where['DeletedAt'] = {
                [Op.not] : null
            };

            const deletedPersons = await Person.findAndCountAll(search);

            const totalPresons = nonDeletedPersons.count + deletedPersons.count;

            const presons = {
                TotalPresons      : totalPresons,
                NonDeletedPersons : nonDeletedPersons.count,
                DeletedPersons    : deletedPersons.count
            };

            return presons;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getUsers = async (filters) => {
        try {
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
                [Op.eq] : null
            };
    
            if (filters.Year != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
            
            search.include.push(includesObj);
    
            const nonDeletedUsers = await User.findAndCountAll(search);

            includesObj.where['DeletedAt'] = {
                [Op.not] : null
            };

            search.include.push(includesObj);

            const deletedUsers = await User.findAndCountAll(search);

            const totalUsers = nonDeletedUsers.count + deletedUsers.count;

            const users = {
                TotalUsers      : totalUsers,
                nonDeletedUsers : nonDeletedUsers.count,
                DeletedUsers    : deletedUsers.count
            };

            return users;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getDoctors = async (filters) => {
        try {
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
                [Op.eq] : null
            };
    
            if (filters.Year != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
            
            search.include.push(includesObj);

            const nonDeletedDoctors = await Doctor.findAndCountAll(search);

            includesObj.where['DeletedAt'] = {
                [Op.not] : null
            };

            search.include.push(includesObj);

            const deletedDoctors = await Doctor.findAndCountAll(search);

            const totalDoctors = nonDeletedDoctors.count + deletedDoctors.count;

            const doctors = {
                TotalDoctors      : totalDoctors,
                NonDeletedDoctors : nonDeletedDoctors.count,
                DeletedDoctors    : deletedDoctors.count
            };

            return doctors;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getAdmins = async (filters) => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const search: any = { where: {}, include: [],  paranoid: false };

            const includesObj =
            {
                model    : Person,
                required : true,
                where    : {},
                paranoid : false
            };

            search.where['RoleId'] = {
                [Op.eq] : 1,
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

            const adminUsers = await User.findAndCountAll(search);

            search.include.push(includesObj);

            const admins = {
                TotalAdmins : adminUsers.count
            };

            return admins;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getEnrollments = async (filters) => {
        try {

            const { minDate, maxDate } = getMinMaxDates(filters);
            const maxCreatedDate = getMaxDate(filters);
            const search: any = { where: {}, include: [], paranoid: false };

            const includesObj =
            {
                model    : Person,
                required : true,
                where    : {
                    
                },
                paranoid : false
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

            if (filters.Year != null && filters.Month != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.lt] : maxCreatedDate,
                };
            }

            search.include.push(includesObj);

            const nonDeletedUsers = await Patient.findAndCountAll(search);

            includesObj.where['DeletedAt'] = {
                [Op.not] : null
            };

            search.include.push(includesObj);

            const deletedUsers = await Patient.findAndCountAll(search);

            const nonDeletedEnrollmentDetails = [];
            for (const u of nonDeletedUsers.rows) {
                const enrollmentDetail = await CareplanEnrollment.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (enrollmentDetail !== null){
                    nonDeletedEnrollmentDetails.push(enrollmentDetail);
                }
            }

            const deletedEnrollmentDetails = [];
            for (const u of deletedUsers.rows) {
                const enrollmentDetail = await CareplanEnrollment.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (enrollmentDetail !== null){
                    deletedEnrollmentDetails.push(enrollmentDetail);
                }
        
            }

            const totalEnrollments = nonDeletedEnrollmentDetails.length + deletedEnrollmentDetails.length;

            const nonDeletedCholestrolEnrollment = nonDeletedEnrollmentDetails.filter(x => x.PlanCode === 'Cholesterol');

            const deletedCholestrolEnrollment = deletedEnrollmentDetails.filter(x => x.PlanCode === 'Cholesterol');

            const totalCholestrolEnrollment = nonDeletedCholestrolEnrollment.length + deletedCholestrolEnrollment.length;

            const nonDeletedStrokeEnrollment = nonDeletedEnrollmentDetails.filter(x => x.PlanCode === 'Stroke');

            const deletedStrokeEnrollment = deletedEnrollmentDetails.filter(x => x.PlanCode === 'Stroke');

            const totalStrokeEnrollment = nonDeletedStrokeEnrollment.length + deletedStrokeEnrollment.length;

            const nonDeletedHFMotivatorEnrollment = nonDeletedEnrollmentDetails.filter(x => x.PlanCode === 'HFMotivator');

            const deletedHFMotivatorEnrollment = deletedEnrollmentDetails.filter(x => x.PlanCode === 'HFMotivator');

            const totalHFMotivatorEnrollment = nonDeletedHFMotivatorEnrollment.length + deletedHFMotivatorEnrollment.length;

            const enrollments = {
                TotalEnrollments                : totalEnrollments,
                NonDeletedEnrollment            : nonDeletedEnrollmentDetails.length,
                DeletedEnrollment               : deletedEnrollmentDetails.length,
                TotalCholestrolEnrollment       : totalCholestrolEnrollment,
                NonDeletedCholestrolEnrollment  : nonDeletedCholestrolEnrollment.length,
                DeletedCholestrolEnrollment     : deletedCholestrolEnrollment.length,
                TotalStrokeEnrollment           : totalStrokeEnrollment,
                NonDeletedStrokeEnrollment      : nonDeletedStrokeEnrollment.length,
                DeletedStrokeEnrollment         : deletedStrokeEnrollment.length,
                TotalHFMotivatorEnrollment      : totalHFMotivatorEnrollment,
                NonDeletedHFMotivatorEnrollment : nonDeletedHFMotivatorEnrollment.length,
                DeletedHFMotivatorEnrollment    : deletedHFMotivatorEnrollment.length

            };

            return enrollments;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getEmergencyContacts = async (filters) => {
        try {
            const { minDate, maxDate } = getMinMaxDates(filters);
            const search: any = { where: {}, paranoid: false };

            search.where['Phone'] = {
                [Op.notBetween] : [1000000000, 1000000100],
            };

            if (filters.Year != null)  {
                search.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
    
            const persons = await Person.findAndCountAll(search);

            const emergencyContactDetails = [];
            for (const p of persons.rows) {
                const emergencyContactDetail = await EmergencyContact.findOne({ where : {
                    ContactPersonId : p.id,
                }, paranoid : false });
                if (emergencyContactDetail !== null){
                    emergencyContactDetails.push(emergencyContactDetail);
                }
            }

            const usersDetails = [];
            for (const p of emergencyContactDetails) {
                const user = await User.findOne({ where : {
                    PersonId : p.ContactPersonId,
                }, paranoid : false });
                if (user !== null){
                    usersDetails.push(user);
                }
            }

            const onlyEmergencyContact =  emergencyContactDetails.length - usersDetails.length;

            const emergencyContacts = {
                TotalEmergencyContacts          : emergencyContactDetails.length,
                EmergencyContactsWhoAreAppUsers : usersDetails.length,
                OnlyEmergencyContacts           : onlyEmergencyContact
            
            };

            return emergencyContacts;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getCholestrolUsers = async (totalUsers, filters) => {
        try {
            let cholestrolUsers = {};
            const cholestrolDetails = [];
            for (const u of totalUsers.rows) {
                const cholestrolDetail = await BloodCholesterol.findOne({
                    where : {
                        PatientUserId : u.UserId,
                    }, paranoid : false
                });
                if (cholestrolDetail !== null) {
                    cholestrolDetails.push(cholestrolDetail);
                }
            }

            const cholestrolUsersRatio = ((cholestrolDetails.length) / (totalUsers.count) * 100).toFixed(2);
            cholestrolUsers = {
                Biometrics : 'Cholestrol',
                Count      : cholestrolDetails.length,
                Ratio      : cholestrolUsersRatio
            };

            if (filters.Year !== null) {
                cholestrolUsers = getMonthlyUsers(cholestrolDetails, totalUsers);
            }

            return cholestrolUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getGlucoseUsers = async (totalUsers, filters) => {
        try {
            let glucoseUsers = {};
            const glucoseDetails = [];
            for (const u of totalUsers.rows) {
                const glucoseDetail = await BloodGlucose.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (glucoseDetail !== null){
                    glucoseDetails.push(glucoseDetail);
                }
            }

            const glucoseUsersRatio = ((glucoseDetails.length) / (totalUsers.count) * 100).toFixed(2);

            glucoseUsers = {
                Biometrics : 'Glucose',
                Count      : glucoseDetails.length,
                Ratio      : glucoseUsersRatio
            };

            if (filters.Year !== null) {
                glucoseUsers = getMonthlyUsers(glucoseDetails,totalUsers);
            }

            return glucoseUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getOxygenSaturationUsers = async (totalUsers, filters) => {
        try {
            let oxygenSaturationUsers = {};
            const oxygenSaturationDetails = [];
            for (const u of totalUsers.rows) {
                const oxygenSaturationDetail = await BloodOxygenSaturation.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (oxygenSaturationDetail !== null){
                    oxygenSaturationDetails.push(oxygenSaturationDetail);
                }
            }

            const oxygenSaturationUsersRatio = ((oxygenSaturationDetails.length) / (totalUsers.count) * 100).toFixed(2);

            oxygenSaturationUsers = {
                Biometrics : 'Oxygen Saturation',
                Count      : oxygenSaturationDetails.length,
                Ratio      : oxygenSaturationUsersRatio
            };

            if (filters.Year !== null) {
                oxygenSaturationUsers = getMonthlyUsers(oxygenSaturationDetails,totalUsers);
            }

            return oxygenSaturationUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getBloodPressureUsers = async (totalUsers, filters) => {
        try {
            let bloodPressureUsers = {};

            const bloodPressureDetails = [];
            for (const u of totalUsers.rows) {
                const bloodPressureDetail = await BloodPressure.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (bloodPressureDetail !== null){
                    bloodPressureDetails.push(bloodPressureDetail);
                }
            }

            const bloodPressureUsersRatio = ((bloodPressureDetails.length) / (totalUsers.count) * 100).toFixed(2);
            bloodPressureUsers = {
                Biometrics : 'Blood Pressure',
                Count      : bloodPressureDetails.length,
                Ratio      : bloodPressureUsersRatio
            };

            if (filters.Year !== null) {
                bloodPressureUsers = getMonthlyUsers(bloodPressureDetails,totalUsers);
            }

            return bloodPressureUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getBodyHeightUsers = async (totalUsers, filters) => {
        try {
            let bodyHeightUsers = {};
            const bodyHeightDetails = [];
            for (const u of totalUsers.rows) {
                const bodyHeightDetail = await BodyHeight.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (bodyHeightDetail !== null){
                    bodyHeightDetails.push(bodyHeightDetail);
                }
            }

            const bodyHeightUsersRatio = ((bodyHeightDetails.length) / (totalUsers.count) * 100).toFixed(2);
            
            bodyHeightUsers = {
                Biometrics : 'Body Height',
                Count      : bodyHeightDetails.length,
                Ratio      : bodyHeightUsersRatio
            };

            if (filters.Year !== null) {
                bodyHeightUsers = getMonthlyUsers(bodyHeightDetails,totalUsers);
            }

            return bodyHeightUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getBodyWeightUsers = async (totalUsers, filters) => {
        try {
            let bodyWeightUsers = {};
            const bodyWeightDetails = [];
            for (const u of totalUsers.rows) {
                const bodyWeightDetail = await BodyWeight.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (bodyWeightDetail !== null){
                    bodyWeightDetails.push(bodyWeightDetail);
                }
            }

            const bodyWeightUsersRatio = ((bodyWeightDetails.length) / (totalUsers.count) * 100).toFixed(2);

            bodyWeightUsers = {
                Biometrics : 'Body Weight',
                Count      : bodyWeightDetails.length,
                Ratio      : bodyWeightUsersRatio
            };

            if (filters.Year !== null) {
                bodyWeightUsers = getMonthlyUsers(bodyWeightDetails,totalUsers);
            }

            return bodyWeightUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getBodyTempratureUsers = async (totalUsers, filters) => {
        try {
            let bodyTempratureUsers = {};
            const bodyTempratureDetails = [];
            for (const u of totalUsers.rows) {
                const bodyTempratureDetail = await BodyTemperature.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (bodyTempratureDetail !== null){
                    bodyTempratureDetails.push(bodyTempratureDetail);
                }
            }

            const bodyTempratureUsersRatio = ((bodyTempratureDetails.length) / (totalUsers.count) * 100).toFixed(2);

            bodyTempratureUsers = {
                Biometrics : 'Body Temprature',
                Count      : bodyTempratureDetails.length,
                Ratio      : bodyTempratureUsersRatio
            };

            if (filters.Year !== null) {
                bodyTempratureUsers = getMonthlyUsers(bodyTempratureDetails,totalUsers);
            }

            return bodyTempratureUsers;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    private  getPulseUsers = async (totalUsers, filters) => {
        try {
            let pulseUsers = {};
            const pulseDetails = [];
            for (const u of totalUsers.rows) {
                const pulseDetail = await Pulse.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                if (pulseDetail !== null){
                    pulseDetails.push(pulseDetail);
                }
            }

            const pulseUsersRatio = ((pulseDetails.length) / (totalUsers.count) * 100).toFixed(2);
            pulseUsers = {
                Biometrics : 'Pulse',
                Count      : pulseDetails.length,
                Ratio      : pulseUsersRatio
            };

            if (filters.Year !== null) {
                pulseUsers = getMonthlyUsers(pulseDetails,totalUsers);
            }

            return pulseUsers;

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

function getMaxDate(filters):Date {
    const numberOfDays = getNumberOfDays(filters.Year,filters.Month);
    const maxDate = new Date();
    maxDate.setUTCFullYear(filters.Year,filters.Month - 1, numberOfDays);
    maxDate.setUTCHours(0, 0, 0, 0);

    return maxDate ;
}

function getNumberOfDays (year: number, month: number): number {
    const nextMonth = new Date(year, month, 1);
    nextMonth.setDate(nextMonth.getDate() - 1);
    return nextMonth.getDate();
}

function getMonthlyUsers(usersData, totalUsers) {
    var months =
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const monthyDetails = [];
    for (const p of usersData) {
        const month = TimeHelper.getMonth(p.CreatedAt);
        monthyDetails.push(month);
    }

    const monthlyUsersData = [];
    for (const m of months) {
        const monthlyUsers = monthyDetails.filter((x) => x === m);
        const ratio = ((monthlyUsers.length) / (totalUsers.count) * 100).toFixed(2);
        const monthlyUsersDetail = {
            Month : m,
            Count : monthlyUsers.length,
            Ratio : ratio,
        };
        monthlyUsersData.push(monthlyUsersDetail);
    }
    return monthlyUsersData;
}

function getUniqueUsers(usersData) {
    const compareObjects = (a, b) => {
        return a.PatientUserId === b.PatientUserId;
    };
    const uniqueArray = usersData.filter((obj, index, self) => {
        return (
            index ===
            self.findIndex((innerObj) => compareObjects(innerObj, obj))
        );
    });
    return uniqueArray;
}
