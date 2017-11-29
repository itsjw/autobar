import winston from "winston"

const   LOGGER: winston.Logger = new winston.Logger({
    level: 'info',
    transports: [
      new (winston.transports.File)({ filename: 'somefile.log' })
    ]
  });


export function getLogger(): winston.Logger {
    return LOGGER;
}