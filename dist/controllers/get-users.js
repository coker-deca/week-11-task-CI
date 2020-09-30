"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.delOneUser = exports.getOneUser = void 0;
const users_model_1 = require("../models/users-model");
async function getOneUser(search) {
    const user = await users_model_1.UserModel.find({ username: search.username });
    return user[0];
}
exports.getOneUser = getOneUser;
async function delOneUser(search) {
    const user = await users_model_1.UserModel.deleteOne({
        username: search,
    });
    return user;
}
exports.delOneUser = delOneUser;
// export async function updateOneUser(
//   search: string,
//   values: Record<string, unknown>
// ) {
//   const user = await UserModel.updateOne(
//     { username: search },
//     {
//       $set: {
//         updateAt: Date.now,
//         email: values.email,
//         password: values.password,
//       },
//     }
//   );
//   return user;
// }
async function getAllUsers() {
    const userdb = await users_model_1.UserModel.find();
    return userdb;
}
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=get-users.js.map