import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: { type: String, required: true },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    profilePic: { type: String, required: false, default: "" },

    coins: { type: Number, default: 100 },

    experiences: { type: Number, default: 0 },

    level: { type: Number, default: 1 },

    wins: { type: Number, default: 0 },

    losses: { type: Number, default: 0 },

    rank: { type: String, default: "Новичок" },

    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hero" }],

    deck: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hero" }],

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    quizProgress: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        score: { type: Number, default: 0 },
        stars: { type: Number, enum: [0, 1, 2, 3], default: 0 },
        completedAt: { type: Date, default: Date.now },
        level: { type: Number, required: true },
        passed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.updateLevel = function () {
  const levelUpThreshold = 100;
  const newLevel = Math.floor(this.experiences / levelUpThreshold) + 1;
  if (this.level !== newLevel) {
    this.level = newLevel;
  }
};

userSchema.pre("save", function (next) {
  if (this.isModified("experiences")) {
    this.updateLevel();
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
