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

    getOverallUsers = async (filters): Promise<any> => {
        try {
            const totalUsers_ = await this.getTotalUsers(filters);
            const totalUsers = {
                Count : totalUsers_.count
            };
            const nonDeletedUsers = await this.getNonDeletedUsers(filters);
            const activeUsers = await this.getActiveUsers(filters);
            const deletedUsers = await this.getDeletedUsers(filters);
            const enrollmentUsers = await this.getEnrollmentUsers(filters);

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

    getDeviceDetailWiseUsers = async (filters): Promise<any> => {
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

    getEnrollmentUsers = async (filters): Promise<any> => {
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

    addAppDownloads = async (createModel: AppDownloadDomainModel):
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

    getAppDownlods= async (): Promise<any> => {
        try {
            const appDownload = await AppDownloadsModel.findAndCountAll();
            return appDownload;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getCountryWiseUsers = async (filters): Promise<any> => {
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

    getMajorAilmentDistributionOfUsers = async (filters): Promise<any> => {
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

    getObesityDistribution = async (filters): Promise<any> => {
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

    getAddictionDistribution = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);

            const healthProfileDetails = [];
            for (const u of totalUsers.rows) {
                const healthProfileDetail = await HealthProfile.findOne({ where : {
                    PatientUserId : u.UserId,
                }, paranoid : false });
                healthProfileDetails.push(healthProfileDetail);
            }
            
            const totalhealthProfileUsers = healthProfileDetails.filter(x => x !== null);

            const tobaccoSmokers = totalhealthProfileUsers.filter(x => x.TobaccoQuestionAns === true);

            const heavyDrinkers = totalhealthProfileUsers.filter(x => x.IsDrinker === true && x.DrinkingSeverity === 'High');

            const substanceAbuse = totalhealthProfileUsers.filter(x => x.SubstanceAbuse === true);

            const nonAddicted  = totalhealthProfileUsers.filter(
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
