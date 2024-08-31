const db = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

const userSchema = new db.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const accountSchema = new db.Schema({
  userId: {
    type: db.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const transferFunds = async (fromAccountId, toAccountId, amount) => {
  await Account.findByIdAndUpdate(fromAccountId, {
    $inc: { balance: -amount },
  });
  await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
};

const Account = db.model("Account", accountSchema);
const userModel = db.model("userModel", userSchema);

module.exports = {
  userModel,
  Account,
  transferFunds,
};
