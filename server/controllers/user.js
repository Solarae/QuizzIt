import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/User.js'

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) return res.status(404).json({ msg: "User doesn't exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const signup = async (req, res) => {
    const { name, email, password } = req.body
    console.log(name)

    try {
        const user = await User.findOne({ email })
        if (user) return res.status(404).json({ msg: "User already exists" })

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const newUser = new User({
            name: name,
            email: email,
            password: hash,
        })

        await newUser.save()
        if (!user) return res.status(404).json({ msg: "Something went wrong with registering the user" });

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
            expiresIn: 3600
        })

        res.status(200).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        })
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}