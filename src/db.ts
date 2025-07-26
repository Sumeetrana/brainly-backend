import { model, Schema, connect, Types } from "mongoose";

connect(
  "mongodb+srv://root:root@cluster0.xrvnj87.mongodb.net/brainly?retryWrites=true&w=majority&appName=Cluster0"
);

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "users", required: true },
});

const UserModel = model("users", UserSchema);
const ContentModel = model("content", ContentSchema);

export { UserModel, ContentModel };
