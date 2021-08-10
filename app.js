const Sequelize = require("sequelize"); //The capitalization indicates this is a contructor function and must be called with the new operator.
const connection = new Sequelize("demo_schema", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Article = connection.define(
  "article",
  {
    slug: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    body: {
      type: Sequelize.TEXT,
      defaultValue: "Not yet completed...",
    },
  },
  {
    timestamps: false,
    // freezeTableName: true,
  }
);

// connection
//   .sync()
//   .then(() => {
//     Article.create({
//       title: "demo title 1",
//       body: "lorem ipsum lots of text lorem ipsum lots of textots of text lorem ipsum lots off text lorem ipsum lots of text lorem ipsum lots of text lorem ipsum lots of text lorem ipsum lots of text lorem ipsum lots of text lorem ipsum lots of text m lott lorem ipsum lots of textots of text lorem ipsum lots off text lorem ipsum lots of text lorem ipsum lots ofs of text lorem ipsum lots of text lorem ipsum lots o",
//     });
//   })
//   .catch();

// connection.sync() alone syncing the model to the database and generate the table in the database
// I then created the demo_schema database using the sql command prompt
// After that I execute "node app" and the table is created.
// Note that sequalize took the liberty to generate id, created_at and updated_at as well.
// I then added .then() to insert data (why? because creatign a table takes time, so Article.create is basically a callback function that consumes the promise.)
// Run the node app again, you can see the insert query executed in the command line. One article has been inserted.

// connection
//   .sync()
//   .then(() => {
//     Article.findByPk(3).then((article) => console.log(article.dataValues));
//   })
//   .catch();

connection
  .sync({ force: true, logging: true })
  .then(() => {
    Article.findAll().then((articles) => console.log(articles.length));
  })
  .catch();
