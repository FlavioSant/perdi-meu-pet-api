import supertest from 'supertest';
import app from '../src/app';

export const request = () => supertest(app);
