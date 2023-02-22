import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    token: { type: String },
});

const User = model("user", userSchema);

export default User;
