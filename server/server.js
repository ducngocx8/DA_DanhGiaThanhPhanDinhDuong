const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
app.use(cookieParser());
app.use(express.static("uploads"));
const { sequelize } = require("./models");
const rootRouter = require("./routers/root.router.js");
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(rootRouter);

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TP Dinh dưỡng thực phẩm",
      description: "API Thực phẩm",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:7000/api",
      },
    ],
  },
  apis: ["./Api/Account/account.router.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(7000, () => {
  console.log("http://localhost:7000");
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connect();
