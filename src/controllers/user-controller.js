import { bcryptUtils, HttpError, jwtUtils } from "../utils";

class UserController {
  constructor(db) {
    this.db = db;
  }

  async register(req, res, next) {
    global.logger.info("UserController::register " + JSON.stringify(req.body));

    try {
      const { email, password, fullName } = req.body;

      //check if user already exists
      const user = await this.db.Users.findOne({ where: { email } });
      if (user) {
        throw new HttpError("User already exists", 400);
      }

      const hash = await bcryptUtils.hashPassword(password);

      await this.db.Users.create({
        email,
        password: hash,
        fullName
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

  async login(req, res, next) {
    global.logger.info("UserController::login " + JSON.stringify(req.body));

    try {
      const { email, password } = req.body;

      //check if user already exists
      const user = await this.db.Users.findOne({ where: { email } });
      if (!user) {
        throw new HttpError("User does not exist", 400);
      }

      const isValid = await bcryptUtils.comparePassword(password, user.password);
      if (!isValid) {
        throw new HttpError("Invalid password", 400);
      }

      const token = await jwtUtils.encodeToken({ id: user.id, email: user.email, role: user.role });

      res.status(200).json({
        status: 200,
        message: "User logged in successfully",
        token,
        ok: true,
      });

    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    global.logger.info("UserController::getUser " + JSON.stringify(req.body));

    try {
      const { id } = req.user;

      const user = await this.db.Users.findOne({
        where: { id },
        attributes: ['id', 'email', 'fullName']
      });

      if (!user) {
        throw new HttpError("User does not exist", 400);
      }

      res.status(200).json({
        status: 200,
        message: "User retrieved successfully",
        user,
        ok: true,
      });

    } catch (error) {
      next(error);
    }
  }
}

export default UserController;