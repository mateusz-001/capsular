import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import healthRouter from './routes/health.routes.js';
import authRouter from './routes/auth.routes.js';

import wardrobeRouter from './routes/wardrobe.route.js';

import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);

app.use('/api/wardrobe', wardrobeRouter);

app.use(errorMiddleware);

export default app;
