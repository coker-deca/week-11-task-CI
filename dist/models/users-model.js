"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TypeSchema = mongoose_1.default.Schema;
const userSchema = new TypeSchema({
    username: { type: String, required: true, index: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "basic", enum: ["viewer", "basic", "supervisor", "admin"], },
});
const UserModel = mongoose_1.default.model("UserModel", userSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=users-model.js.map