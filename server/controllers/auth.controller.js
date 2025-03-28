import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password should be at least 6 characters long" });
    }

    const user = await User.findOne({ username });

    if (user) return res.status(400).json({ message: "username already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    return res.status(201).json({
      message: "User created successfully!",
      user: {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        coins: newUser.coins,
        experiences: newUser.experiences,
        level: newUser.level,
        rank: newUser.rank,
        quizProgress: newUser.quizProgress,
        friends: newUser.friends,
        deck: newUser.deck,
        cards: newUser.cards,
        losses: newUser.losses,
        wins: newUser.wins,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(404).json({ message: "all fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "wrong password or username" });

    const checkedPassword = await bcrypt.compare(password, user.password);

    if (!checkedPassword) {
      return res.status(404).json({ message: "wrong password or username" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      message: "you are loged in",
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        coins: user.coins,
        experiences: user.experiences,
        level: user.level,
        rank: user.rank,
        quizProgress: user.quizProgress,
        friends: user.friends,
        deck: user.deck,
        cards: user.cards,
        losses: user.losses,
        wins: user.wins,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = (req, res) => {
  res.status(200).json(req.user);
};
