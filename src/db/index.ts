import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDB = async () => {
  let l = config.connectionString.length;
  console.log(`Database Connected Successfully, Total connectionString character ${l}`);
};
