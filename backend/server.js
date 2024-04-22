import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { app, server} from './socket/socket.js'

// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

// Error Handler
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB() // Connect to MongoDb


const port = process.env.PORT || 5000;


// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())


app.get('/api/config/paypal', (req, res) => {
  return res.send({ clientId: process.env.PAPAL_CLIENT_ID})
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/notifications', notificationRoutes)


const __dirname = path.resolve(); // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  // any route that is not api will be directed to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}else{
  app.get('/', (req, res) => {
    res.send('API is running')
  })
  
}

app.use(notFound);
app.use(errorHandler)


server.listen(port, () => console.log(`Server running on port:${port}`))