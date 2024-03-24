import path from 'path';
import express from 'express';
import http from 'http'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import socketIO from 'socket.io'; 


// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Error Handler
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB() // Connect to MongoDb


const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app)
const io = socketIO(server)

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);

  // Handle events here
  socket.on('eventName', (data) => {
    // Handle event data
  });
});


app.get('/api/config/paypal', (req, res) => {
  return res.send({ clientId: process.env.PAPAL_CLIENT_ID})
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


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


app.listen(port, () => console.log(`Server running on port:${port}`))