import { Op } from 'sequelize';
import { ApiError } from '../../../../../common/api.error';
import { Logger } from '../../../../../common/logger';
import { IStatisticsRepo } from '../../../../repository.interfaces/statistics/statistics.repo.interface';
import Person from '../../models/person/person.model';
import Patient from '../../models/users/patient/patient.model';
import { Helper } from '../../../../../common/helper';
import User from '../../models/users/user/user.model';
import HealthProfile from '../../models/users/patient/health.profile.model';

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
     
            if (filters.Year != null)  {
                includesObj.where['Phone'] = {
                    [Op.notBetween] : [1000000000, 1000000100],
                };
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
                includesObj.where['DeletedAt'] = {
                    [Op.eq] : null
                };
            }
            else {
                includesObj.where['Phone'] = {
                    [Op.notBetween] : [1000000000, 1000000100],
                };
                includesObj.where['DeletedAt'] = {
                    [Op.eq] : null
                };
            }
            search.include.push(includesObj);
    
            const _totalUsers = await Patient.findAndCountAll(search);
    
            const  totalUsers = {
                Count : _totalUsers.count
            };
    
            return totalUsers;
            
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getActiveUsers = async (filters): Promise<any> => {
        try {
            const totalUsers = await this.getTotalUsers(filters);
            const { minDate, maxDate } = getMinMaxDates(filters);
            const search: any = { where: {}, include: [] };

            const includesObj =
            {
                model    : Person,
                required : true,
                where    : {
                    
                },
            };

            const includesObjs =
            {
                model    : User,
                required : true,
                where    : {
                    
                },
            };

            // const includesLoginSession =  {
            //     model    : UserLoginSession,
            //     required : true,
            //     where    : {
                    
            //     },
            // };

            // const includesObjs =
            // {
            //     model    : User,
            //     required : true,
            //     where    : {
                    
            //     },
            //     include : {
            //         model    : UserLoginSession,
            //         required : true,
            //         where    : {
            //             LastLogin : { [Op.ne]: null, }
            //         },
            //     }
            // };

            // includesLoginSession.where['ValidTill'] = {
            //     [Op.lt] : new Date(),
            // };

            includesObjs.where['LastLogin'] = {
                [Op.ne] : null,
            };
     
            if (filters.Year != null)  {
                includesObj.where['Phone'] = {
                    [Op.notBetween] : [1000000000, 1000000100],
                };
                includesObj.where['DeletedAt'] = {
                    [Op.eq] : null
                };
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
            else {
                includesObj.where['Phone'] = {
                    [Op.notBetween] : [1000000000, 1000000100],
                };
                includesObj.where['DeletedAt'] = {
                    [Op.eq] : null
                };
            }
            search.include.push(includesObj,includesObjs);
    
            const totalActiveUsers = await Patient.findAndCountAll(search);
    
            const activeUsersRatio = ((totalActiveUsers.count) / (totalUsers.Count) * 100).toFixed(2);
    
            const  _activeUsers = {
                Count : totalActiveUsers.count,
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
            
            const { minDate, maxDate } = getMinMaxDates(filters);
            const totalUsers = await this.getTotalUsers(filters);
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
    
            if (filters.Year != null)  {
                includesObj.where['Gender'] = {
                    [Op.like] : "Male",
                };
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
            else {
                includesObj.where['Gender'] = {
                    [Op.like] : "Male",
                };
            }
            search.include.push(includesObj);
    
            const totalMaleUsers = await Patient.findAndCountAll(search);
    
            const maleUsersRatio = ((totalMaleUsers.count) / (totalUsers.Count) * 100).toFixed(2);
    
            const maleUsers = {
                Count : totalMaleUsers.count,
                Ratio : maleUsersRatio,
            };
    
            if (filters.Year != null)  {
                includesObj.where['Gender'] = {
                    [Op.like] : "Female",
                };
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
            else {
                includesObj.where['Gender'] = {
                    [Op.like] : "Female",
                };
            }
            search.include.push(includesObj);
    
            const totalFemaleUsers = await Patient.findAndCountAll(search);

            const femaleUsersRatio = ((totalFemaleUsers.count) / (totalUsers.Count) * 100).toFixed(2);
    
            const femaleUsers = {
                Count : totalFemaleUsers.count,
                Ratio : femaleUsersRatio,
            };
    
            if (filters.Year != null)  {
                includesObj.where['Gender'] = {
                    [Op.like] : "Intersex",
                };
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }
            else {
                includesObj.where['Gender'] = {
                    [Op.like] : "Intersex",
                };
            }
            search.include.push(includesObj);
    
            const totalIntersexUsers = await Patient.findAndCountAll(search);
            const IntersexUsersRatio = ((totalIntersexUsers.count) / (totalUsers.Count) * 100).toFixed(2);
    
            const intersexUsers = {
                Count : totalIntersexUsers.count,
                Ratio : IntersexUsersRatio,
            };
    
            if (filters.Year != null)  {
                includesObj.where['Gender'] = {
                    [Op.or] : [{ [Op.like]: 'Unknown' },{ [Op.like]: 'Other' }],
                };
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate] };
            }
            else {
                includesObj.where['Gender'] = {
                    [Op.or] : [{ [Op.like]: 'Unknown' },{ [Op.like]: 'Other' }],
                };
            }
            search.include.push(includesObj);
    
            const totalGenderNotSpecifiedUsers = await Patient.findAndCountAll(search);

            const genderNotSpecifiedUsersRatio =
            ((totalGenderNotSpecifiedUsers.count) / (totalUsers.Count) * 100).toFixed(2);

            const genderNotSpecifiedUsers = {
                Count : totalGenderNotSpecifiedUsers.count,
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
    
            if (filters.Year != null)  {
                includesObj.where['CreatedAt'] = {
                    [Op.between] : [minDate, maxDate],
                };
            }

            search.include.push(includesObj);
    
            const totalUsers_ = await Patient.findAndCountAll(search);

            const totalUsers = totalUsers_.rows.map(x => x.Person.BirthDate);
            const usersWithBirthDate = totalUsers.filter(x => x != null);

            const totalAgeNotSpecifiedUsers = (totalUsers.length) - (usersWithBirthDate.length);

            const ageNotSpecifiedUsersRatio = ((totalAgeNotSpecifiedUsers) / (totalUsers.length) * 100).toFixed(2);
    
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
                    ((totalUsersBetweenTwoNumbers.length) / (totalUsers.length) * 100).toFixed(2);

                usersBetweenTwoNumbers = {
                    Count : totalUsersBetweenTwoNumbers.length,
                    Ratio : usersBetweenTwoNumbersRatio,
                };
         
            }
       
            const totalUsersBelowThirtyfive = totalUsresWithAge.filter(x => x <= 35);
            const usersBelowThirtyfiveRatio = ((totalUsersBelowThirtyfive.length) / (totalUsers.length) * 100).toFixed(2);
    
            const usersBelowThirtyfive = {
                Count : totalUsersBelowThirtyfive.length,
                Ratio : usersBelowThirtyfiveRatio,
            };

            const totalUsersBetweenThirtysixToSeventy = totalUsresWithAge.filter(x => x >= 36 && x <= 70);

            const usersBetweenThirtysixToSeventyRatio =
            ((totalUsersBetweenThirtysixToSeventy.length) / (totalUsers.length) * 100).toFixed(2);
    
            const usersBetweenThirtysixToSeventy = {
                Count : totalUsersBetweenThirtysixToSeventy.length,
                Ratio : usersBetweenThirtysixToSeventyRatio,
            };

            const totalUsersAboveSeventy = totalUsresWithAge.filter(x => x >= 71);
            const usersAboveSeventyRatio =
            ((totalUsersAboveSeventy.length) / (totalUsers.length) * 100).toFixed(2);
    
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
            const { minDate, maxDate } = getMinMaxDates(filters);
            const search: any = { where: {}, include: [] };

            if (filters.Year != null) {
                search.where['CreatedAt'] = { [Op.between]: [minDate, maxDate] };
            }
            
            const totalHealthProfileUsers_ = await HealthProfile.findAndCountAll(search);
    
            const totalHealthProfileUsers = totalHealthProfileUsers_.rows.map(x => x.MaritalStatus);
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
