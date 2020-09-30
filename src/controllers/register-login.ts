import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel as User, UserModel } from "../models/users-model";

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

interface USER {
  username: string;
  email: string;
  password: string;
  role: string;
}

export async function createNewUSer({ username, email, password, role }: USER) {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
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
  } catch (error) {
    return error.message;
  }
}

function getToken(username: string) {
  try {
    const key = process.env["JWT_SECRET"];
    const token = jwt.sign({ username }, key as string, { expiresIn: "1d" });
    return { data: token };
  } catch (e) {
    return { error: e.message };
  }
}

export function decodeToken(token: string) {
  try {
    const key = process.env["JWT_SECRET"]!;
    const user = jwt.verify(token, key);
    return { data: user };
  } catch (e) {
    return { error: e.message };
  }
}

export async function loginUser({ username, password }: USER) {
  const pass = password;
  const user = await UserModel.findOne({ username: username });
  if (!user) throw new Error("No user with this username");
  const validPassword = validatePassword(pass, user.password);

  if (!validPassword) throw new Error("Incorrect password used");
  const accessToken = getToken(username);
  user.token = accessToken.data;
  return user.token;
}
