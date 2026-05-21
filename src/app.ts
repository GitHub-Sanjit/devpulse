import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import CookieParser from "cookie-parser";
import cors from "cors";

import { userRouter } from "./modules/user/user.route";
import { issueRouter } from "./modules/issue/issue.route";
import globalErrorHandler from "./middleware/globalErrorHandler";

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

app.get("/test", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hi there, This is a test route?", author: "Maintainer" });
});

app.use(globalErrorHandler);

export default app;
