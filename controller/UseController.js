import userSchemaModel from "../model/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = "mmfksmfksmdkfmkmsfkmksmfkmskfks";
// singup api

export const signup = async (req, res, next) => {
  let { name, email, password, confirmPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const confPassword = await bcrypt.hash(password, 10);

    const user = new userSchemaModel({
      name,
      email,
      password: hashedPassword,
      confirmPassword: confPassword,

    });

    if (password === confirmPassword) {
      const data = await user.save();
      const authToken = jwt.sign({ data }, jwtSecret);
console.log(authToken)
      res
        .status(201)
        .json({ data: data,token: authToken,message: "User signedUp SuccessFully" });
    } else {
      res.status(400).json({ message: "passwords not match" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch All Users
export const getAllusers = async (req, res, next) => {
  let Users;
  try {
    Users = await userSchemaModel.find();
    // res.status(201).json({ data: data, message: "Getting All users" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  if (!Users) {
    return res.status(404).json({ message: "no users found" });
  }
  return res.status(200).json({ Users });
};

//login api
export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userSchemaModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "User Not Found",
   
      });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "invalid password" });
      } else {
        const authToken = jwt.sign({ existingUser }, jwtSecret);
        
        return res.status(201).json({
          message: "login successful",
          existingUser,
          authToken: authToken,
        });
    
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

