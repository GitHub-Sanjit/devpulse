import app from "./app";
import { initDB } from "./db";

const PORT = 5000;

const main = () => {
  initDB();
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

main();
