const express = require('express');
const productRouters = require('./routers/productRouters');
const categoryRouters = require('./routers/categoryRouters');
const userRouters = require('./routers/userRouters');
const cartRouters = require('./routers/cartRouters');
const orderRouters = require('./routers/orderRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const dotenv = require("dotenv");
const session = require("express-session");
const jwt = require("jsonwebtoken");    

require("./config/passport")
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cocoon_original');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    };
}

const app = express();
app.use(
  session({
    secret: "afhgfhfdhgfh123213",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
const port = 4000;

connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Sử dụng các routes cho sản phẩm và danh mục
app.use('/products', productRouters);
app.use('/categories', categoryRouters);
app.use('/users', userRouters);
app.use('/carts', cartRouters);
app.use('/orders', orderRouters);

// Social authentication routes
app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"], // Thêm cả public_profile
    })
  );
  
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "http://localhost:3000/login?error=true",
      session: false,
    }),
    (req, res) => {
      // Tạo JWT token
      const token = jwt.sign({ userId: req.user._id }, "afhgfhfdhgfh123213", {
        expiresIn: "1h",
      });
      res.redirect(`http://localhost:3000/login?token=${token}`);
    }
  );
  // Google Authentication Routes
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account consent",
    })
  );
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "http://localhost:3000/login?error=true",
      session: false,
    }),
    (req, res) => {
      const token = jwt.sign({ userId: req.user._id }, "afhgfhfdhgfh123213", {
        expiresIn: "1h",
      });
      res.redirect(`http://localhost:3000/login?token=${token}`);
    }
  );

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

