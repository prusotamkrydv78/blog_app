import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import AuthRoutes from "./routes/Auth.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;
const connectionString = process.env.CONNECTION_STRING;

const app = express();

// Set up EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// connecting to the database
console.log("Attempting to connect to MongoDB Atlas...");
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase the timeout if needed
  })
  .then(() => {
    console.log("Database connected successfully!!");
  })
  .catch((err) => {
    console.log("Database failed to connect");
    console.log("Error name:", err.name);
    console.log("Error message:", err.message);
    console.log("Error code:", err.code);
    console.log("Error codeName:", err.codeName);
    if (err.errorResponse) {
      console.log("Error details:", err.errorResponse);
    }
  });

// Dummy data for frontend
const dummyUsers = [
  {
    id: "1",
    username: "john_doe",
    email: "john@example.com",
    bio: "Web developer and blogger",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    username: "jane_smith",
    email: "jane@example.com",
    bio: "Tech enthusiast and writer",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const dummyPosts = [
  {
    id: "1",
    title: "Getting Started with Node.js",
    content:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    creator: dummyUsers[0],
    createdAt: new Date(2023, 5, 15),
    comments: [
      { id: "1", content: "Great article!", author: dummyUsers[1] },
      { id: "2", content: "Thanks for sharing!", author: dummyUsers[0] },
    ],
  },
  {
    id: "2",
    title: "Express.js Fundamentals",
    content:
      "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    creator: dummyUsers[1],
    createdAt: new Date(2023, 6, 20),
    comments: [
      { id: "3", content: "This helped me a lot!", author: dummyUsers[0] },
    ],
  },
  {
    id: "3",
    title: "MongoDB for Beginners",
    content:
      "MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.",
    image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c",
    creator: dummyUsers[0],
    createdAt: new Date(2023, 7, 5),
    comments: [],
  },
];

// Routes
const testSchema = new mongoose.Schema({
  name: String,
  address: String,
});

const testModel = mongoose.model("Test", testSchema);
app.get("/", (req, res) => {
  res.render("home", {
    title: "BlogVerse - Home",
    posts: dummyPosts,
    user: null,
  });
});
app.get("/test", (req, res) => {
  res.render("auth/test");
});
app.post("/test", async (req, res) => {
  console.log(req.body);
  const { name, address } = req.body;
  const test = new testModel({ name, address });
  await test.save();
  res.send("Data saved");
});
app.use("/auth", AuthRoutes);

app.get("/explore", (req, res) => {
  res.render("explore", {
    title: "BlogVerse - Explore",
    posts: dummyPosts,
    user: null,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "BlogVerse - About Us",
    user: null,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "BlogVerse - Contact Us",
    user: null,
  });
});

app.get("/categories", (req, res) => {
  res.render("categories", {
    title: "BlogVerse - Categories",
    user: null,
  });
});

app.get("/posts/:id", (req, res) => {
  const post = dummyPosts.find((post) => post.id === req.params.id);
  if (!post) {
    return res.status(404).render("404", {
      title: "BlogVerse - Not Found",
      user: null,
    });
  }
  res.render("post", {
    title: `BlogVerse - ${post.title}`,
    post,
    user: null,
  });
});

app.use((req, res) => {
  res.status(404).render("404", {
    title: "BlogVerse - Page Not Found",
    user: null,
  });
});

app.listen(PORT, () => {
  console.log(`Blog app listening on port ${PORT}!`);
});
