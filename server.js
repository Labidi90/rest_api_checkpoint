require("dotenv").config({ path: __dirname + "/config/.env" });
const express = require("express");
const PORT = process.env.PORT || 5000;
const User = require("./models/User");
const connectDatabase = require("./config/database");

connectDatabase();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a new user to the database
app.post("/api/user", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exist" });
    }
    user = new User({
      fullName,
      email,
      password,
    });
    await user.save();
    res.status(200).json({ msg: "user creation success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
  //   console.log(req.body);
  res.json(req.body);
});

// Return all users
app.get("/api", async (req, res) => {
  try {
    let user = await User.find();
    res.send({ alluser: user, msg: "getted successfully" });
  } catch (error) {
    console.error(error);
  }
});

// Edit a user by ID
app.put("/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.send({ msg: "updated successfully" });
  } catch (error) {
    console.error(error);
  }
});

// Remove a user by ID
app.delete("/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "deleted successfully" });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
