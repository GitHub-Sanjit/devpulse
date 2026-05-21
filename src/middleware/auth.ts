import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { ROLES } from "../types";
import config from "../config";
import { pool } from "../db";
import { sendResponse } from "../utils/sendResponse";

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization as string;

      if (!token) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized Access!!",
        });
      }

      const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;

      const userData = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [decoded.id]
      );

      if (userData.rows.length === 0) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "User Not Found",
        });
      }

      const user = userData.rows[0];

      if (roles.length && !roles.includes(user.role)) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden!!, This Role has no access",
        });
      }

      req.user = {
        id: user.id,
        role: user.role,
      };

      next();
    } catch (error) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth;
