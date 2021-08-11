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
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [10, 100],
          msg: "Please enter a message that is longer than 10 but shorter than 150 characters.",
        },
      },
    },
    body: {
      type: DataTypes.TEXT,
      // defaultValue: "Not yet completed...",
      validate: {
        startsWithCapital(value) {
          const first = value.charAt(0);
          if (first !== first.toUpperCase()) {
            throw new Error(
              "Your article content must start with capital letter."
            );
          }
        },
      },
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
  .sync({ force: true, logging: console.log })
  .then(() => {
    Article.create({
      slug: "wibble",
      title: "wiggle ooooooooooo",
      body: "Wobble ooo",
    });
  })
  .catch((err) => console.error(err));
