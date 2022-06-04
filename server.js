const { app, PORT } = require("./config/config");
const { connectDB, mongoose } = require("./config/dbConn");

const bootstrap = async () => {
  try {
    connectDB();
    mongoose.connection.once("open", () => {
      console.log("Connected to database");
      app.listen(PORT, () => {
        console.log(`Server is listening on PORT:${PORT}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
