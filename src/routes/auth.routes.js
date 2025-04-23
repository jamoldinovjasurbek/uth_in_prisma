import { Router } from "express";
import AuthController from "../controller/auth.controller.js";

const AuthRoutes = Router();
const controller = new AuthController();
AuthRoutes.post("/register", controller.register.bind(controller));
AuthRoutes.post("/login", controller.login.bind(controller));
AuthRoutes.post("/logout",controller.logout.bind(controller))

export default AuthRoutes;
