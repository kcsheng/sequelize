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
    // Whitelist the properties reinforce to avoid sql injection
    Article.create(req.body, { fields: ["title", "content"] }).then(
      (article) => {
        console.log(article.dataValues);
      }
    );
  })
  .catch((err) => console.error(err));
