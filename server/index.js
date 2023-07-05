import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/product.js";
import reviewRoutes from "./routes/review.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// const swaggerDocument = require("./swagger.json");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
import swaggerUi from 'swagger-ui-express';

// import { register } from "./controller/auth.js";
// import { createPost } from "./controller/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Product from "./models/Product.js";
// import Review from "./models/Review.js";
// import { users, products, reviews } from "./data/index.js";

/*  CONFIGURATIONS */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use( (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//This is testing PR

// app.use("/assests", express.static(path.join(__dirname, "public/assests")));

/* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assests");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

/* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

/* MOONGOOSE SETUP */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Product.insertMany(products);
    // Review.insertMany(reviews);
  })
  .catch((error) => console.log(`${error} did not connect`));
