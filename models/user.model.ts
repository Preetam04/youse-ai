import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>; // Add the custom method here
  generateJWTToken(): string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  console.log("password hashed");

  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// userSchema.methods.generateJWTToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       username: this.username,
//     },
//     process.env.JWT_SECRET || "AlternateSeceasdasdYouasdasdasdasd",
//     {
//       expiresIn: process.env.JWT_EXPIRY,
//     }
//   );
// };

export const User: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", userSchema);
