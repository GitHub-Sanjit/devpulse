import dotenv from "dotenv";
import path from "path";
import { env } from "process";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connectionString: env.CONNECTIONSTRING as string,
  port: env.PORT,
  jwt_secret: env.JWT_SECRET as string,
  refresh_secret: env.REFRESH_SECRET as string,
};

export default config;