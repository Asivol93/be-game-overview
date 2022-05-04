import express from "express";
import cors from "cors";
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'


const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/test'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

//Import Routes
const postsRoute = require('./routes/posts')

// Middleware
app.use(cors());
app.use(express.json());
app.use('/posts', postsRoute)

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
