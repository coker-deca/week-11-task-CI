"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNew = exports.getAll = exports.updateOne = exports.delOne = exports.getOne = void 0;
const organization_model_1 = __importDefault(require("../models/organization-model"));
async function getOne(search) {
    // authenticate(context);
    try {
        const organization = await organization_model_1.default.find({
            organization: search.organization,
        });
        return organization[0];
    }
    catch (err) {
        console.log(err.message);
    }
}
exports.getOne = getOne;
async function delOne(search) {
    try {
        const organization = await organization_model_1.default.findOneAndDelete({
            organization: search.organization,
        });
        if (!organization)
            return "No organization to be deleted";
        return organization;
    }
    catch (err) {
        console.log(err.message);
    }
}
exports.delOne = delOne;
async function updateOne(parameters) {
    const { organization, organizations } = parameters;
    const searchOrg = await organization_model_1.default.findOne({ organization });
    if (!searchOrg)
        return "Organization does not exist";
    try {
        const foundOrg = organization_model_1.default.findOneAndUpdate({ organization }, { ...organizations });
        return foundOrg;
    }
    catch (e) {
        console.error(e);
    }
}
exports.updateOne = updateOne;
async function getAll(context) {
    // authenticate(context);
    const organizationdb = await organization_model_1.default.find();
    return organizationdb;
}
exports.getAll = getAll;
async function createNew(request) {
    console.log(request.organization);
    const organization = new organization_model_1.default(request.organization);
    try {
        const newOrg = await organization.save();
        return newOrg;
    }
    catch (err) {
        console.error(err);
    }
}
exports.createNew = createNew;
//# sourceMappingURL=get-org.js.map