import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);

app.get("/test", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hi there, This is a test route?", author: "Admin" });
});

export default app;
