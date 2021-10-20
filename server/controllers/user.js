import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/User'

const signin = async (req, res) => {
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