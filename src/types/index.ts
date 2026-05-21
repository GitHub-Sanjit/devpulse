export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
};

export const USER_ROLE = {
  contributor: "contributor",
  maintainer: "maintainer",
} as const;

export type ROLES = "contributor" | "maintainer";

export const ISSUE_TYPE = ["bug", "feature_request"] as const;
export const ISSUE_STATUS = ["open", "in_progress", "resolved"] as const;

export type IssueType = (typeof ISSUE_TYPE)[number];
export type IssueStatus = (typeof ISSUE_STATUS)[number];
