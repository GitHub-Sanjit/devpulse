import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { ROLES } from "../types";
import config from "../config";
import { pool } from "../db";

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      //  1. Check token
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access!!",
        });
      }

      //  2. Verify token
      const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;

      //  3. Find user by ID (NOT email)
      const userData = await pool.query(`SELECT * FROM users WHERE id = $1`, [
        decoded.id,
      ]);

      if (userData.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }

      const user = userData.rows[0];

      // 5. Role check
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!!, This Role has no access",
        });
      }

      // 6. Attach user
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth;
