import { bcryptUtils, HttpError } from "../utils";

class UserController {
  constructor(db) {
    this.db = db;
  }

  async register(req, res, next) {
    global.logger.info("UserController::register " + JSON.stringify(req.body));

    try {
      const { email, password, fullName } = req.body;

      // check required fields
      if (!email || !password || !fullName) {
        throw new HttpError("Missing required fields", 400, false);
      }
      const hash = await bcryptUtils.hashPassword(password);

      await this.db.User.create({
        email,
        password: hash
      });

      res.status(201).json({
        message: "User created successfully",
        ok: true,
      });

    } catch (error) {
      next(error);
    }
  }
}

export default UserController;