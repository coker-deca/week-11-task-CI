import {UserModel} from "../models/users-model";

export async function getOneUser(search: any) {
  const user = await UserModel.find({ username: search.username });
  return user[0];
}

export async function delOneUser(search: string) {
  const user = await UserModel.deleteOne({
    username: search,
  });
  return user;
}

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

export async function getAllUsers() {
  const userdb = await UserModel.find();
  return userdb;
}
