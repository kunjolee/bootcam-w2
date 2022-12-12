import { Request } from 'express';

export interface CustomRequest <B={}, P={}> extends Request{
    body: B,
    cookies: P
}