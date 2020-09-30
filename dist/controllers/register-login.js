"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.decodeToken = exports.createNewUSer = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = require("../models/users-model");
async function hashPassword(password) {
    return await bcrypt_1.default.hash(password, 10);
}
async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt_1.default.compare(plainPassword, hashedPassword);
}
async function createNewUSer({ username, email, password, role }) {
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = new users_model_1.UserModel({
            username,
            email,
            password: hashedPassword,
            role: role || "basic",
        });
        const user = await newUser.save();
        const token = getToken(user.username);
        user.token = token.data;
        //   const registered = [user, token.data];
        return user;
    }
    catch (error) {
        return error.message;
    }
}
exports.createNewUSer = createNewUSer;
function getToken(username) {
    try {
        const key = process.env["JWT_SECRET"];
        const token = jsonwebtoken_1.default.sign({ username }, key, { expiresIn: "1d" });
        return { data: token };
    }
    catch (e) {
        return { error: e.message };
    }
}
function decodeToken(token) {
    try {
        const key = process.env["JWT_SECRET"];
        const user = jsonwebtoken_1.default.verify(token, key);
        return { data: user };
    }
    catch (e) {
        return { error: e.message };
    }
}
exports.decodeToken = decodeToken;
async function loginUser({ username, password }) {
    const pass = password;
    const user = await users_model_1.UserModel.findOne({ username: username });
    if (!user)
        throw new Error("No user with this username");
    const validPassword = validatePassword(pass, user.password);
    if (!validPassword)
        throw new Error("Incorrect password used");
    const accessToken = getToken(username);
    user.token = accessToken.data;
    return user.token;
}
exports.loginUser = loginUser;
//# sourceMappingURL=register-login.js.map