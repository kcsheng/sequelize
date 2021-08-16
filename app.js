const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("demo_schema", "root", "", {
  host: "localhost",
  dialect: "mysql",
  password: "12345678",
});
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Sequelze connected ...");
//   })
//   .catch((err) => console.error(err));

// This will work too

const sequelConnect = async () => {
  await sequelize.authenticate();
  console.log("Connection successful...");
};

sequelConnect();
