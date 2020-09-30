"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_org_1 = require("./get-org");
const register_login_1 = require("./register-login");
const get_users_1 = require("./get-users");
const root = {
    updateOrganization: get_org_1.updateOne,
    createOrganization: get_org_1.createNew,
    deleteOrganization: get_org_1.delOne,
    organizationOne: get_org_1.getOne,
    organizations: get_org_1.getAll,
    registerUser: register_login_1.createNewUSer,
    login: register_login_1.loginUser,
    getUser: get_users_1.getOneUser,
    getAllUsers: get_users_1.getAllUsers
};
exports.default = root;
//# sourceMappingURL=resolvers.js.map