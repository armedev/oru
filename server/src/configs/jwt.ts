import * as jwt from "jsonwebtoken";
import { expressjwt, Request } from "express-jwt";
import { config } from "dotenv";
config();

const accessSecretKey = process.env.ACCESS_SECRET_KEY || "abcde";
const refreshSecretKey = process.env.REFRESH_SECRET_KEY || "abcde";

type PayloadType = {
  id: string;
  email: string;
};

export const generateAccessToken = (payload: PayloadType) => {
  try {
    const token = jwt.sign(payload, accessSecretKey, {
      expiresIn: 600, //60s * 10 = 600s
    });
    return token;
  } catch (err) {
    console.error(err);
    throw new Error("failed to generate access token");
  }
};

export const generateRefreshToken = (payload: PayloadType) => {
  try {
    const token = jwt.sign(payload, refreshSecretKey, {
      expiresIn: "2d",
    });
    return token;
  } catch (err) {
    console.error(err);
    throw new Error("failed to generate refresh token");
  }
};

export const verifyAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, accessSecretKey);
    if (typeof payload === "string") throw new Error("invalid token");
    return payload as PayloadType;
  } catch (err) {
    console.error(err);
    throw new Error("failed to verify access token");
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const payload = jwt.verify(token, refreshSecretKey);
    if (typeof payload === "string") throw new Error("invalid token");
    return payload as PayloadType;
  } catch (err) {
    console.error(err);
    throw new Error("failed to verify refresh token");
  }
};

export const jwtMiddleware = expressjwt({
  secret: accessSecretKey,
  algorithms: ["HS256"],
});

export type JwtRequest = Request<PayloadType>;
