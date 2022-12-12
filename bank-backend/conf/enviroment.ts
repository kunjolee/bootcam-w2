import dotenv from 'dotenv';
dotenv.config();

export const DB_NAME= process.env.DB_NAME || '';
export const DB_USER= process.env.USER_NAME || '';
export const DB_PASS= process.env.DB_PASSWORD || '';
export const APP_PORT= process.env.APP_PORT || '';
export const DB_PORT= process.env.DB_PORT || '';
export const HOST= process.env.HOST || '';
export const JWT_PRIVATE_KEY= process.env.JWT_PRIVATE_KEY || '';
