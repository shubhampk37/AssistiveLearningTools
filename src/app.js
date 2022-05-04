require("dotenv").config();
const express = require("express");
const app = new express();
require("./db/conn");
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const Register = require("./models/registers");
const static_path = path.join(__dirname, "/../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
//Solving the ROOT Path problem using the named static paths
//commit check from github for pull
app.use("/css", express.static(path.join(__dirname, "/../public/css")));
app.use("/js", express.static(path.join(__dirname, "/../public/js")));
app.use("/Images", express.static(path.join(__dirname, "/../public/Images")));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/face", (req, res) => {
  res.render("face_det");
});

app.get("/", (req, res) => {
  res.render("onboarding");
});
app.get("/ourstory", (req, res) => {
  res.render("ourstory");
});
app.get("/categories", (req, res) => {
  res.render("categories");
});

app.get("/ed", (req, res) => {
  res.render("qna");
});
app.get("/ispy", (req, res) => {
  res.render("ispy");
});

app.get("/categories/ISpy_bl", (req, res) => {
  res.render("ISpy_bl");
});

app.get("/categories/ISpy_bl/ispy_game", (req, res) => {
  res.render("ispy");
});
app.get("/categories/ISpy_bl/ispy_prereq_1", (req, res) => {
  res.render("ispy_prereq_1");
});
app.get("/categories/ISpy_bl/ispy_prereq_2", (req, res) => {
  res.render("ispy_prereq_2");
});
app.get("/categories/emotioni_bl", (req, res) => {
  res.render("emotioni_bl");
});
app.get("/categories/emotioni_bl/emotioni_prereq_1", (req, res) => {
  res.render("emotioni_prereq_1");
});
app.get("/categories/emotioni_bl/emotioni_prereq_2", (req, res) => {
  res.render("emotioni_prereq_2");
});
app.get("/categories/emotioni_bl/emotioni_prereq_3", (req, res) => {
  res.render("emotioni_prereq_3");
});
app.get("/categories/emotioni_bl/emotioni_prereq_4", (req, res) => {
  res.render("emotioni_prereq_4");
});
app.get("/categories/emotioni_bl/ed", (req, res) => {
  res.render("qna");
});
app.get("/categories/socialstory_bl", (req, res) => {
  res.render("socialstory_bl");
});
app.get("/categories/socialstory_bl/socialstory_prereq1", (req, res) => {
  res.render("socialstory_prereq1");
});
app.get("/categories/socialstory_bl/socialstory_prereq2", (req, res) => {
  res.render("socialstory_prereq2");
});
app.get("/categories/socialstory_bl/socialstory_prereq3", (req, res) => {
  res.render("socialstory_prereq3");
});
app.get("/categories/socialstory_bl/socialstory_prereq4", (req, res) => {
  res.render("socialstory_prereq4");
});
app.get("/categories/basicmath_bl", (req, res) => {
  res.render("basicmath_bl");
});
app.get("/categories/basicmath_bl/basic_math_prereq", (req, res) => {
  res.render("basic_math_prereq");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/secret", auth, (req, res) => {
  // console.log(`The cookie is ${req.cookies.jwt}`);
  res.render("secret");
});
app.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currElement) => {
      return currElement.token != req.token;
    });
    res.clearCookie("jwt");
    console.log("logout successfully");

    await req.user.save();
    res.render("login");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // const hp = bcrypt.hash(password,10);
    const useremail = await Register.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, useremail.password);

    const token = await useremail.generateAuthToken();
    console.log("the token part in login is" + token);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 50000),
      httpOnly: true,
    });
    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("Login Credentials do not match");
    }
  } catch (error) {
    res.status(400).send("Invalid email");
  }
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerStudent = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        age: req.body.age,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });
      //console.log(registerStudent);

      const token = await registerStudent.generateAuthToken();
      console.log("the token part in register is " + token);

      //Cookie
      res.cookie("jwt", token, {});

      const registered = await registerStudent.save();
      res.status(201).render("login");
    } else {
      res.send("Passwords don't macth");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
