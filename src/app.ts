import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

app.get("/test", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hi there, This is a test route?", author: "Admin" });
});

export default app;
