// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route');
const productRouter = require('./routes/product.route');
const cors = require('cors')


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware cors
const corsOption = {
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption))

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));
app.get("/",(req,res)=>{
    res.send("welcome to home page")
})
// Use post routes
app.use('/api/auth', userRouter)
app.use('/api', productRouter)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});