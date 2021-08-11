const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const connection = new Sequelize("demo_schema", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Article = connection.define(
  "article",
  {
    title: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
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
    // Article.create({
    //   title: "This is a title",
    //   content: "This is the content",
    // });
    const articleObj = Article.build({
      title: "this is an article title",
      content: "This is an article content...",
    });
    articleObj.save();
  })
  .catch((err) => console.error(err));
