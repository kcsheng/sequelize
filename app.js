const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const connection = new Sequelize("demo_schema", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Article = connection.define("article", {
  title: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

connection
  .sync({ force: true })
  .then(() => {
    const req = {
      body: {
        title: "some title",
        content: "some content",
        approved: true,
      },
    };
    // Bulkcreate using json syntax
    Article.bulkCreate(
      [
        {
          title: "This is title1",
          content: "This is content1",
        },
        {
          title: "This is title2",
          content: "This is content2",
        },
        {
          title: "This is title3",
          content: "This is content3",
        },
      ],
      {
        validate: true,
        ignoreDuplicate: true,
      }
    ).then((article) => {
      console.log(article.dataValues);
    });
  })
  .catch((err) => console.error(err));
