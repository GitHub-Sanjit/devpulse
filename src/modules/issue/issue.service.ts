import { pool } from "../../db";
import { ISSUE_STATUS, ISSUE_TYPE } from "../../types";
import type { IIssue } from "./issue.interface";

const createIssueIntoDB = async (payload: IIssue) => {
  const { title, description, type, status, reporter_id } = payload;

  //Basic validation
  if (!title || title.length > 150) {
    throw new Error("Title is required and must be <= 150 characters");
  }

  if (!description || description.length < 20) {
    throw new Error("Description must be at least 20 characters");
  }

  if (!ISSUE_TYPE.includes(type)) {
    throw new Error("Invalid issue type");
  }

  if (status && !ISSUE_STATUS.includes(status)) {
    throw new Error("Invalid issue status");
  }

  //Insert into DB
  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type, status, reporter_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [title, description, type, status || "open", reporter_id],
  );

  return result.rows[0];
};

const getAllIssueFromDB = async () => {
  // Get all issues
  const issueResult = await pool.query(`SELECT * FROM issues`);
  const issues = issueResult.rows;

  if (issues.length === 0) {
    return [];
  }

  // Extract unique reporter IDs
  const reporterIds = [...new Set(issues.map((i) => i.reporter_id))];

  // Get all reporters in one query
  const userResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = ANY($1)`,
    [reporterIds],
  );

  const users = userResult.rows;

  // Create lookup map
  const userMap = new Map();
  users.forEach((user) => {
    userMap.set(user.id, user);
  });

  // Transform issues
  const formattedIssues = issues.map((issue) => {
    const reporter = userMap.get(issue.reporter_id);

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: reporter
        ? {
            id: reporter.id,
            name: reporter.name,
            role: reporter.role,
          }
        : null,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });

  return formattedIssues;
};

const getSingleIssueFromDB = async (id: number) => {
  // Get issue
  const issueResult = await pool.query(`
      SELECT * FROM issues WHERE id = $1
    `, 
    [id]
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  // Get reporter
  const userResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id],
  );

  const reporter = userResult.rows[0];

  // Format response
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporter
      ? {
          id: reporter.id,
          name: reporter.name,
          role: reporter.role,
        }
      : null,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

export const issueServices = {
  createIssueIntoDB,
  getAllIssueFromDB,
  getSingleIssueFromDB,
};
