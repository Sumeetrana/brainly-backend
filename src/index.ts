import express from "express";
import jwt from "jsonwebtoken";

import { UserModel } from "./db";

const JWT_SECRET = "S3cret";

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  // TODO: hash password, zod validation, Handle different scenarios
  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username,
      password,
    });

    res.json({
      message: "User signed up",
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  const exisitingUser = await UserModel.findOne({
    username,
  });

  if (exisitingUser) {
    const token = jwt.sign(
      {
        id: exisitingUser._id,
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials!",
    });
  }
});

app.get("/api/v1/content", (req, res) => {
  const { type, link } = req.body;
});

app.post("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3001, () => {
  console.log("Server is listening...");
});
