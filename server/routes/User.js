import express from "express";
import {UserLogin, UserRegister} from "../controllers/User.js"

const UserRoutes=express.Router();

UserRoutes.post("/signup",UserRegister);
UserRoutes.post("/signin",UserLogin);



export default UserRoutes;