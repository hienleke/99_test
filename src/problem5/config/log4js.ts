import log4js from "log4js";
import path from "path";

log4js.configure({
  appenders: {
    file: {
      type: "file",
      filename: path.join(__dirname, "../logs/app.log"),
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
    },
    out: { type: "stdout" },
  },
  categories: {
    default: { appenders: ["file", "out"], level: "debug" },
  },
});

export const logger = log4js.getLogger();
