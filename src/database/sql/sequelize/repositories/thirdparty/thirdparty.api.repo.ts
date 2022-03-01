import { IThirdpartyApiRepo } from '../../../../../database/repository.interfaces/thirdparty/thirdparty.api.repo.interface';
import { ApiError } from '../../../../../common/api.error';
import { Logger } from '../../../../../common/logger';
import { ThirdpartyApiCredentialsDomainModel, ThirdpartyApiCredentialsDto } from '../../../../../domain.types/thirdparty/thirdparty.api.credentials';
import { ThirdpartyApiCredentialsMapper } from './../../mappers/thirdparty/thirdparty.api.credentials.mapper';
import ThirdpartyApiCredentials from './../../models/thirdparty/thirdparty.api.credentials.model';
import { Op } from 'sequelize';

///////////////////////////////////////////////////////////////////////

export class ThirdpartyApiRepo implements IThirdpartyApiRepo {

    addThirdpartyCredentials = async (userId: string, connectionModel: ThirdpartyApiCredentialsDomainModel)
        : Promise<ThirdpartyApiCredentialsDto> => {
        try {
            const entity = {
                UserId    : userId,
                Provider  : connectionModel.Provider ?? null,
                BaseUrl   : connectionModel.BaseUrl ?? null,
                Token     : connectionModel.Token ?? null,
                ValidTill : connectionModel.ValidTill ?? null,
            };
            const creds = await ThirdpartyApiCredentials.create(entity);
            const dto = ThirdpartyApiCredentialsMapper.toDto(creds);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }

    getThirdpartyCredentials = async (userId: string, provider: string, baseUrl: string)
        : Promise<ThirdpartyApiCredentialsDto> => {
        try {
            const creds = await ThirdpartyApiCredentials.findOne({
                where : {
                    UserId    : userId,
                    Provider  : provider,
                    BaseUrl   : baseUrl,
                    ValidTill : {
                        [Op.gte] : new Date(),
                    }
                }
            });
            const dto = ThirdpartyApiCredentialsMapper.toDto(creds);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }

}