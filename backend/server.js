import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'

// Error Handler
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB() // Connect to MongoDb


const port = process.env.PORT || 5000;

const app = express();

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use(notFound);
app.use(errorHandler)


app.listen(port, () => console.log(`Server running on port:${port}`))