const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Food = require("../models/foodModel");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

  // for local database,databse.connect(process.env.DATABASE_LOCAL{})
  //for hosted database, we use below one
  
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connection established!!!"));

const foods = JSON.parse(
  fs.readFileSync(`${__dirname}/all-food.json`, "UTF-8")
);

const importData = async () => {
  try {
    await Food.create(foods);
    console.log("Data imported successfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//deleting all the data

const deleteData = async () => {
  try {
    await Food.deleteMany();

    console.log("Data deleted sucessfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
