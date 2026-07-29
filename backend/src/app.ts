import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import healthRouter from './routes/health.routes.js';
import authRouter from './routes/auth.routes.js';

import wardrobeRouter from './routes/wardrobe.routes.js';
import universalRouter from './routes/universal.routes.js';
import outfitRouter from './routes/outfits.routes.js';
import wearEventsRouter from './routes/wearEvents.routes.js';
import calendarRouter from './routes/calendar.routes.js';
import profileRouter from './routes/profile.routes.js';
import analyticsRouter from './routes/analytics.routes.js';

import errorMiddleware from './middlewares/error.middleware.js';
import requestLoggerMiddleware from './middlewares/requestLogger.middleware.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(morgan('dev'));

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);

app.use('/api/wardrobe', wardrobeRouter);
app.use('/api/universal', universalRouter);
app.use('/api/outfits', outfitRouter);
app.use('/api/wear-events', wearEventsRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/profile', profileRouter);
app.use('/api/analytics', analyticsRouter);

app.use(errorMiddleware);

export default app;
