const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const connection = new Sequelize("demo_schema", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Article = connection.define(
  "article",
  {
    slug: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
    },
  },
  {
    hooks: {
      beforeValidate() {
        console.log("This shows for beforeValidate");
      },
      afterValidate() {
        console.log("THis shows for aftervalidate");
      },
      beforeCreate() {
        console.log("This shows for beforeCreate");
      },
      afterCreate(obj) {
        console.log(
          `This shows for aftercreate. The result has slug as ${obj.dataValues.slug}`
        );
      },
    },
  },
  {
    timestamps: false,
    // freezeTableName: true,
  }
);

connection
  .sync({ force: true })
  .then(() => {
    Article.create({
      slug: "This is Slug",
      title: "This is title",
      body: "This is the body...",
    });
  })
  .catch((err) => console.error(err));
