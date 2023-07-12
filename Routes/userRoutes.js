import express from "express"
import UserModel from "../Schema/userSchema.js"


const userRouter = express.Router()

// userRouter.post('/users', async(req, res) => {
//     const { name, email, phone  } = req.body
//     try{
    //     let user = new UserModel({name, email, phone})
    //     await user.save()
    //     res.send({
    //         message:"user is created",
    //         status:1
    //     })
    // }
    // catch(err){
    //     res.send({
    //         message:err.message,
    //         status:0
    //     })
    // }
// }) 

const createUser = async(req, res) => {
    const { name, email, phone  } = req.body
    try{
        let user = new UserModel({name, email, phone})
        await user.save()
        res.send({
            message:"user is created",
            status:1
        })
    }
    catch(err){
        res.send({
            message:err.message,
            status:0
        })
    
    }
} 

// userRouter.get('/users', async(req, res) => {
//     try{
//         const users = await UserModel.find()
//         res.send(users)
//     }
//     catch(err){
//         res.send({
//             message:err.message
//         })
//     }
// })
const getUser = async(req, res) => {
    try{
        const user = await UserModel.find()
        res.send(user)
    }
    catch(err){
        res.send({
            message:err.message
        })
    }
}

const getUserById = async(req, res) => {
    const user = await UserModel.findById(req.params.id)
    if(user){
        res.send(user)
    }
    else{
        res.send({
            message:"Cannot find user"
        })
    }
}

const updateUser = async(req, res) => {
    const { name, email, phone } = req.body
    const user = await UserModel.findById(req.params.id)

    if(user){
        user.name = name
        user.email = email
        user.phone = phone

        const updatedUser = await user.save()
        res.send(updatedUser)
    }
    else{
        res.status(400)
        throw new Error("user cannot be updated")
    }
    
} 

const deleteUser = async(req, res) => {
    const user = await UserModel.findById(req.params.id)

    if(user){
        await UserModel.deleteOne()
        res.json({
            message:"User Deleted"
        })
    }
    else{
        res.status(400)
        throw new Error("user cannot be deleted")
    }
}

userRouter.route('/users').get(getUser)
userRouter.route('/users').post(createUser)
userRouter.route('/users/:id').get(getUserById)
userRouter.route('/users/:id').put(updateUser)
userRouter.route('/users/:id').delete(deleteUser)

export default userRouter