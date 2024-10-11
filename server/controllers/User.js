import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

 export const UserRegister = async (req,res,next) => {
    try {
        const { email, password, name, img } = req.body;

        // Check if the email is in use
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
          return next(createError(409, "Email is already in use."));
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
          name,
          email,
          password: hashedPassword,
          img,
        });
        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
          expiresIn: "9999 years",
        });
        return res.status(200).json({ token, user });
      } catch (error) {
        return next(error);
      }
 }
 export const UserLogin = async (req,res,next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email }).exec();
        // Check if user exists
        if (!user) {
          return next(createError(404, "User not found"));
        }
        // console.log(user);
        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
          return next(createError(403, "Incorrect password"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT, {
          expiresIn: "9999 years",
        });

        return res.status(200).json({ token, user });
      }catch(err){
        next(err);
    }
 };

 const getUserDashboard = async (req,res,next) => {
    try{
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if(!user){
            return next(createError(404, "User not found"));
        }

        const currentDateFormatted = new Date();
        const startToday = new Date(
          currentDateFormatted.getFullYear(),
          currentDateFormatted.getMonth(),
          currentDateFormatted.getDate()
        );

        const endToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate() + 1
          );
           //calculte total calories burnt
    const totalCaloriesBurnt = await Workout.aggregate([
        { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
        {
          $group: {
            _id: null,
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
      ]);

      //Calculate total no of workouts
      const totalWorkouts = await Workout.countDocuments({
        user: userId,
        date: { $gte: startToday, $lt: endToday },
      });

      //Calculate average calories burnt per workout
      const avgCaloriesBurntPerWorkout =
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
          : 0;
          // Fetch category of workouts
    const categoryCalories = await Workout.aggregate([
        { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
        {
          $group: {
            _id: "$category",
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
      ]);
    }catch(err){
        next(err);
    }
 }