const mongoose = require('mongoose')


const dbConnection = () => {
  try {
    const db_path = process.env.db_url;
    if (!db_path) throw new Error();
    dbConnection(db_path);
  } catch (error) {
    console.log(error.message);
  }

  function dbConnection(url) {
    mongoose.connect(url);
    const db = mongoose.connection;

    db.on("error", (error) => {
      console.log(error);
    });

    db.once("open", () => {
      console.log("db connected");
    });
  }
};

module.exports = {
    dbConnection
}