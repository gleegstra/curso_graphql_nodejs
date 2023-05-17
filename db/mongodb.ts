import { config } from '../config/config';
import mongoose from 'mongoose';

mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB}`);

export { mongoose };

