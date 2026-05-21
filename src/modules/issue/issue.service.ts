import { pool } from "../../db";
import type { IIssue } from "./issue.interface";

const createIssueIntoDB = async (payload:IIssue) => {
  const { title, description, type, reporter_id } = payload;

  //Basic validation
  if (!title || title.length > 150) {
    throw new Error("Title is required and must be <= 150 characters");
  }

  if (!description || description.length < 20) {
    throw new Error("Description must be at least 20 characters");
  }

  if (!["bug", "feature_request"].includes(type)) {
    throw new Error("Invalid issue type");
  }

  //Insert into DB
  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type, reporter_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [title, description, type, reporter_id],
  );

  return result.rows[0];
};

export const issueServices = {
  createIssueIntoDB,
};
