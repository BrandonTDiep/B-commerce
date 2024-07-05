const express = require("express");;
// express app
const app = express();
const path = require("path");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const searchRoutes = require("./routes/searches");
const userRoutes = require("./routes/user");
const flash = require("express-flash");
const connectDB = require("./config/database");
const port = process.env.PORT || 4000;

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });


// Enable CORS for client origin only
const cors = require('cors')
const corsOptions = {
   origin : ['https://b-commerce-client.onrender.com', 'https://localhost:3000'],
}
app.use(cors(corsOptions))

//middleware
//Body Parsing
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Render React as View
app.use(express.static(path.join(__dirname, "..", "client", "build")));

// Use flash messages for errors, info, ect...
app.use(flash());

// Setup Routes For Which The Server Is Listening
// when we fire request to this route right here I want you to use these routes 
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/searches', searchRoutes)
app.use('/api/user', userRoutes)


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error", stack } = err;
  console.log(stack);
  res.status(status).json({ message });
});

// connect to mongodb
connectDB().then(() => {
    // Server Running
    app.listen(port, () => {
      console.log("Server is running, you better catch it!");
    });

  })
  .catch((error) => {
    console.log(error)
  })




// mongoose us known as odm which stands for object data modeling and it basically wraps mongodb with an extra layer that allows us to use methods to read and write database documents and it also gives us a way to declare models and schemas to esnure a more strict data structure. It adds an extra layer of structure like adding requirements that a document must have a title, body, author 