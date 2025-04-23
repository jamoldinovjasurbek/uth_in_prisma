import AuthService from "../service/auth.service.js";
class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  async register(req, res, next) {
    try {
      const data = req.body;
      const result = await this.authService.register(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await this.authService.login({ username, password }, res);
      res.cookie("refreshtoken", result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: result.message,
        accessToken: result.accessToken,
        user: result.user,
      });
    
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "logout successful" });
  }
}
export default AuthController;
