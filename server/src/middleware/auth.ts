import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import env from "../util/validateEnv";

export const requiresAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createHttpError(401, "Authorization header missing"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch (error) {
    next(createHttpError(401, "Invalid token"));
  }
};
