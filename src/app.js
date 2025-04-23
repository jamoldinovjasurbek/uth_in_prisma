import express, { Router } from "express";
import prisma from "../prisma/client.js";
import "dotenv/config";
import ErrorMiddleware from "./middleware/error.middleware.js";
import AuthRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api",AuthRoutes)
app.use(ErrorMiddleware)
app.use(cookieParser())


const initApp = async () => {
  try {
    await prisma.$connect();
    console.log("database connected");
    app.listen(PORT, () => {
      console.log("database connected at port:", PORT);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1)
    
  }
};
initApp();
