import multer, { FileFilterCallback } from "multer";
import path from "path";
import { nanoid } from "nanoid";
import { Request } from "express";
import { HttpError } from "../helpers/index.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = nanoid();
    cb(null, `$${uniquePrefix}_${file.originalname}`);
  },
});

const limits = { fileSize: 1024 * 1024 * 5 };

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return cb(HttpError(400, "The file extension cannot be exe"));
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });
export default upload;
