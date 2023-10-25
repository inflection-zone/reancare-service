import express from 'express';
import { Logger } from '../../common/logger';
import { IUserAuthorizer } from '../interfaces/user.authorizer.interface';
import { CurrentUser } from '../../domain.types/miscellaneous/current.user';
import { Injector } from '../../startup/injector';
import { UserService } from '../../services/users/user/user.service';
import { RolePrivilegeService } from '../../services/role/role.privilege.service';

//////////////////////////////////////////////////////////////

export class CustomUserAuthorizer implements IUserAuthorizer {

    _userService: UserService = null;

    _rolePrivilegeService: any = null;

    constructor() {
        this._userService = Injector.Container.resolve(UserService);
        this._rolePrivilegeService = Injector.Container.resolve(RolePrivilegeService);
    }

    public authorize = async (request: express.Request): Promise<boolean> => {
        try {
            const currentUser = request.currentUser;
            const context = request.context;
            if (context == null || context === 'undefined') {
                return false;
            }
            if (currentUser == null) {
                return false;
            }
            const hasPrivilege = await this._rolePrivilegeService.hasPrivilegeForRole(
                currentUser.CurrentRoleId,
                context);

            if (!hasPrivilege) {
                return false;
            }

            const isResourceOwner = await this.isResourceOwner(currentUser, request);
            const hasConsent = await this.hasConsent(currentUser.CurrentRoleId, context);
            if (hasConsent || isResourceOwner) {
                return true;
            }
            return false;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

    private isResourceOwner = async (user: CurrentUser, request: express.Request): Promise<boolean> => {
        if (request.resourceOwnerUserId == null) {
            return false;
        }
        if (request.resourceOwnerUserId === user.UserId) {
            return true;
        }
        return false;
    };

    private hasConsent = async (currentRoleId: number, context: string): Promise<boolean> => {

        Logger.instance().log('Current role id: ' + currentRoleId);
        Logger.instance().log('Context: ' + context);

        //for time being, return true always
        return true;
    };

}
