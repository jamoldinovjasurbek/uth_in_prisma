import prisma from "../../prisma/client.js";
import bcrypt, { hash } from "bcrypt";
import JwtService from "./jwt.service.js";
import { CustomError } from "../utils/custom.error.js";

class AuthService {
  constructor() {
    this.prisma = prisma;
    this.JwtService = new JwtService();
  }
  async register(data) {
    const { username, password, fullName, email } = data;
    const exist = await this.prisma.user.findUnique({
      where: { username },
    });
    if (exist) {
      throw new CustomError("username already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await this.prisma.user.create({
      data: {
        fullName,
        username,
        email,
        password: hashedPassword,
      },
    });
    return {
      message: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        password: newUser.password,
      },
    };
  }
  async login({ username, password }) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("invalid password", 401);
    }
    const { accessToken, refreshToken } = this.JwtService.generateTokenUsers(
      user.id,
      user.username
    );
  
    return {
      message: "login Successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}
export default AuthService;
