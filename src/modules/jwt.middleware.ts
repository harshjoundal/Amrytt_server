import { Injectable, NestMiddleware ,Next,Req,Res} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {config} from '../config/config'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(@Req() req:any, @Res() res, @Next() next) {
    const token = req.headers.Authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, config.secret_key); 
      req.tokenData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    }
}