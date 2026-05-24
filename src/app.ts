import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import CookieParser from "cookie-parser";
import cors from "cors";

import { userRouter } from "./modules/user/user.route";
import { issueRouter } from "./modules/issue/issue.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { StatusCodes } from "http-status-codes";

const app: Application = express();

app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5000",
  openSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/auth", userRouter);
app.use("/api/issues", issueRouter);

app.get("/", (req, res) => {
  res.send({ message: "This is the root route" });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found: ${req.originalUrl}`) as any;
  error.statusCode = StatusCodes.NOT_FOUND;
  next(error);
});

app.use(globalErrorHandler);

export default app;
