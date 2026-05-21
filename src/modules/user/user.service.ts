import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { IUser } from "./user.interface";
import { pool } from "../../db";
import config from "../../config";

const registerUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
      INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, COALESCE($4,'contributor'))
      RETURNING *
    `,
    [name, email, hashedPassword, role],
  );
  delete result.rows[0].password;
  return result;
};

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  //* 1. Check if the user exist in database by email
  const { email, password } = payload;
  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new Error("Invalid Credential");
  }
  //* 2. Compare the password
  const user = userData.rows[0];
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    throw new Error("Invalid Credential");
  }
  //* 3. Generate token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(jwtPayload, config.refresh_secret, {
    expiresIn: "10d",
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};

export const userServices = {
  registerUserIntoDB,
  loginUserIntoDB,
};
