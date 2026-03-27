import { User } from "../models/user.model.ts"; // adjust path

declare global {
  namespace Express {
    interface Request {
      user?: User; // or your custom user type
      file?: Express.Multer.File;
      rawBody:Buffer
    }
  }
}