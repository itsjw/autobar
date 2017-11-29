import winston from "winston"

export const LOGGER: winston.Logger = new winston.Logger({
    level: 'info',
    transports: [
      new (winston.transports.File)({ filename: 'somefile.log' })
    ]
  });