const { Router } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({
            success: true,
            message: "User created",
            user: { id: user.id, username: user.username, email: user.email } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "User doesn't exist" });
        }

        const confirmPassword = await bcryptjs.compare(password, user.password);

        if (!confirmPassword) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '15min' }
        );

        const refreshToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1d' } 
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Login failed" });
    }
});

module.exports = userRouter;
