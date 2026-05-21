import type { Request, Response } from "express";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const result = await userServices.registerUserIntoDB({
      name,
      email,
      password,
      role,
    });
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.loginUserIntoDB(req.body);
    const { accessToken, refreshToken, user } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Login successful",
      data: { token: accessToken, user },
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const userController = {
  registerUser,
  loginUser,
};
