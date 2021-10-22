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

      //check if user already exists
      const user = await this.db.Users.findOne({ where: { email } });
      if (user) {
        throw new HttpError("User already exists", 400, false);
      }

      const hash = await bcryptUtils.hashPassword(password);

      await this.db.Users.create({
        email,
        password: hash
      });

      res.status(201).json({
        status: 201,
        message: "User created successfully",
        ok: true,
      });

    } catch (error) {
      next(error);
    }
  }
}

export default UserController;