import "dotenv/config";
import jwt from "jsonwebtoken";
import { HttpError } from "./index.js";

type TokenType = "access" | "refresh";
interface IGenerateToken {
  id: number;
  token_identifier: string;
}

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
} = process.env;

const generateToken = (type: TokenType, payload: IGenerateToken) => {
  if (
    !ACCESS_TOKEN_SECRET ||
    !REFRESH_TOKEN_SECRET ||
    !ACCESS_TOKEN_TIME ||
    !REFRESH_TOKEN_TIME
  ) {
    throw HttpError(
      500,
      "Error: One or more required values are missing: ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME"
    );
  }

  let tokenTime: string;
  let tokenSecret: string;
  if (type === "access") {
    tokenTime = ACCESS_TOKEN_TIME;
    tokenSecret = ACCESS_TOKEN_SECRET;
  } else {
    tokenTime = REFRESH_TOKEN_TIME;
    tokenSecret = REFRESH_TOKEN_SECRET;
  }

  const parsedTime = parseInt(tokenTime);

  return jwt.sign(payload, tokenSecret, { expiresIn: parsedTime });
};

export default generateToken;
