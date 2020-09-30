import mongoose from "mongoose";

const TypeSchema = mongoose.Schema;

interface USER extends mongoose.Document{
  token: string | undefined;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  email: string | null;
  password: string;
  role: string | null;
}


const userSchema = new TypeSchema({
  username: { type: String, required: true, index: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "basic", enum: ["viewer", "basic", "supervisor", "admin"], },
});

const UserModel = mongoose.model<USER>("UserModel", userSchema);

export { UserModel };
