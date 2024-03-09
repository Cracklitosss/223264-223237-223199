import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://hex:12345@cluster0.ha8qnnw.mongodb.net/CycleSafe', {});

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 6,
    message: 'Demasiadas peticiones realizadas, intenta después de 1 hora',
});


app.use('/users', accountLimiter, userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
