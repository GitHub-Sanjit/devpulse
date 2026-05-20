import type { Request, Response } from "express";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const result = await userServices.createUserIntoDB({
      name,
      email,
      password,
      role,
    });
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Created Successfully",
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

export const userController = {
  createUser,
};
