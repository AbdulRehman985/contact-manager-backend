const express = require("express");
require("dotenv").config();
const contactRoute = require("./routes/contactRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const errorHandle = require("./middleware/errorHandler.js");
const connectDB = require("./config/db.js");
const app = express();
const port = process.env.PORT || 5002;

// Middleware to parse JSON
app.use(express.json());
connectDB();
// Route 
app.use("/api/contact", contactRoute);
app.use("/api/user", userRoute);

app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});