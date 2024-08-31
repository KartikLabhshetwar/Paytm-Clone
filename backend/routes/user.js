const express = require("express")
const router = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
const {userModel, Account} = require("../db")
const {authMiddleware} = require("../middleware");



const userSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

router.post('/signup', async (req, res)=>{

    const validateUser = userSchema.safeParse(req.body)

    if(validateUser.success != true){
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const existingUser = await userModel.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
          message: "Email already taken",
        });
    }

    const user = await userModel.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({userId}, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })
    
})

const signupBody = z.object({
    username: z.string().email(),
    password: z.string()
})

router.post('/signin', async (req, res)=>{
    const validateUser = signupBody.safeParse(req.body);
    if(validateUser.success != true){
       return res.status(411).json({
            message: "Incorrect inputs."
        })
    }

    const existingUser = await userModel.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(existingUser){
        const token = jwt.sign({userId: existingUser._id}, JWT_SECRET)
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select("firstName lastName username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});


const updateUser = z.object({
    password: z.number().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put("/", authMiddleware, async (req, res)=>{

    const validateUser = updateUser.safeParse(req.body);
    if(validateUser.success != true){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

     await userModel.updateOne({_id: req.userId}, req.body);

    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk", async (req, res)=>{
        const filter = req.query.filter || "";

        const users = await userModel.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        });


        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
})





module.exports = router;