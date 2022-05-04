import express from "express";
import bodyParser from 'body-parser'
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
const usersRoute = require('./routes/users')

// Middleware
app.use(bodyParser.json())
app.use(express.json());
app.use('/posts', postsRoute)
app.use('/users', usersRoute)

const User = mongoose.model("User", UserSchema);

export const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        response: {
          message: "Please, log in",
        },
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: "Oh no, something went wrong!",
      error: error,
      success: false,
    });
  }
};

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
