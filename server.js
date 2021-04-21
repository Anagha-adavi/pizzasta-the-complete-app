const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app"); //calling express() function  will add a bunch of methods to app
const mongoose = require("mongoose");

///database connection
const db = process.env.DATABASE.replace("<password>", process.env.password);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connection successful....");
  });

//server work
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening to the server on port ${process.env.PORT}...`);
});
