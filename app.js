const bcrypt = require("bcrypt");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const connection = new Sequelize("demo_schema", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const User = connection.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.TEXT,
    },
  },
  {
    hooks: {
      afterValidate(obj) {
        obj.password = bcrypt.hashSync(obj.password, 8);
      },
    },
  },
  {
    timestamps: false,
    // freezeTableName: true,
  }
);

connection
  .sync({ force: true, logging: console.log })
  .then(() => {
    User.create({
      username: "user123",
      password: "thisisapassword",
    });
  })
  .catch((err) => console.error(err));
