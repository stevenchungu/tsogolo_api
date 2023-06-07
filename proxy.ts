// proxy.ts
import { Request, Response, NextFunction } from 'express';

export function proxyMiddleware(req: Request, res: Response, next: NextFunction) {
  req.headers['x-forwarded-proto'] = 'https';
  next();
}