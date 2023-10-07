const exppress = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const typeDefs = require("./Graphql/typeDefs");
const resolvers = require("./Graphql/resolvers");

const app = exppress();
const connection = require("./Sequelize/index");

const PORT = process.env.PORT || 5051;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(cors());
  app.use(exppress.json());
  app.use(bodyParser.json());

  await server.start();

  app.use("/grapgql", expressMiddleware(server));

  app.get("/", () => {
    console.log(`server running...`);
  });

  app.listen(PORT, () => {
    console.log(`Server is running  at port ${PORT}`);
  });
}
startServer();
