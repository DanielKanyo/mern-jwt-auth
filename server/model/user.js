import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
});

const User = model("user", userSchema);

export default User;
