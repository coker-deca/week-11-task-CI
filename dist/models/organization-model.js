"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TypeSchema = mongoose_1.default.Schema;
const OrgSchema = new TypeSchema({
    organization: { type: String, required: true, index: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    products: { type: [String] },
    marketValue: { type: String },
    address: { type: String },
    ceo: { type: String },
    country: { type: String },
    noOfEmployees: { type: Number },
    employees: { type: [String] },
});
const OrganizationModel = mongoose_1.default.model("OrganizationModel", OrgSchema);
exports.default = OrganizationModel;
//# sourceMappingURL=organization-model.js.map