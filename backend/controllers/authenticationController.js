import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";
import crypto from "crypto";

class AuthenticationController {
    async  login(req, res) {
        console.log("request recieved")
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({
                    error: "Such Username Doesnt exist",
                });


            } else {
                if (password !== user.password) {
                    return res.status(400).json({
                        error: "invalid password",
                    });
                }
            }
            const token = Jwt.sign({ userId: user._id }, "tokennnnn", {
                expiresIn: "20d",
            });
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 15 * 24 * 60 * 1000,
    
            });
            res.status(200).json({
                message: "user logged in successfully",
                _id: user._id,
                
                username: user.username,
              
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log("loginUser error", error.message);
        }
    }
    
}

const Authentication = new AuthenticationController();

export {
    Authentication
}