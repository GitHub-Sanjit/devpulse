import type { Request, Response } from "express";
import { issueServices } from "./issue.service";
import { sendResponse } from "../../utils/sendResponse";

const createIssue = async (req: Request, res: Response) => {
  try {
    // Extract from JWT
    const user = (req as any).user;

    const payload = {
      ...req.body,
      reporter_id: user.id, // from token
    };

    const result = await issueServices.createIssueIntoDB(payload);

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to create issue",
    });
  }
};

const getAllIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueServices.getAllIssueFromDB();
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const result = await issueServices.getSingleIssueFromDB(id);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: error.message,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const payload = req.body;
    const user = req.user; // from auth middleware
    console.log({ id: id, payload: payload, user: user });
    const result = await issueServices.updateIssueIntoDB(id, payload, user);
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await issueServices.deleteIssueFromDB(id, req.user);
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
    });
  }
};
export const issueController = {
  createIssue,
  getAllIssue,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
