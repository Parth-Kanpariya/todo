import mongoose from "mongoose";
import { logger, level } from "./logger";
import { constants as DB_CONST } from "../constant/database";
import { initialize } from "mongoose-auto-increment";

const URL = DB_CONST.MONGO_URL;
// const OPEN_EVENT = "open";
// const ERROR_EVENT = "error";
const CONNECTED = "connected";
const DISCONNECTED = "disconnected";
export let db;
(async () => {
  try {
    db = mongoose.createConnection(URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    logger.log(level.error, `connection error ${e}`);
  }
})();

initialize(db);
db.on(CONNECTED, () => {
  logger.log(level.info, `Successfully connected to db at ${URL}`);
});
db.on(DISCONNECTED, () => {
  logger.log(level.error, `connection error while connection at ${URL}`);
});
