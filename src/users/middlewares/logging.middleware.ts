/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from "jsonwebtoken"

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization
    if (!bearerToken) {
        return res.status(401).json({ code: 401, message: "Bearer token not found" })
    }
    const [bearer, token] = bearerToken.split(" ");
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {_id: decodedToken._id, email: decodedToken.email};
    
    next();
  }
}
