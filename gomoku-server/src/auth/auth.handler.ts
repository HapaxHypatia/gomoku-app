import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import validateSchema from '../util/validateSchema'
import { createUser, getUserByUsername } from './auth.service'
import {
  LoginInput,
  RegisterInput,
  registerSchema,
} from './auth.schema'
import { signJwt } from '../util/jwt'
import UserModel from "./user.model";

const authHandler = express.Router()

authHandler.post(
  '/register',
  validateSchema(registerSchema),
  async (req: Request<{}, {}, RegisterInput['body']>, res: Response) => {
    try {
      const { username, password } = req.body

      // check if user already exist
      // Validate if user exist in our database
      const existingUser = await getUserByUsername(username)

      if (existingUser) {
        return res.status(409).send('User Already Exist. Please Login')
      }

      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10)

      // Create user in our database
      const newUser = await createUser({
        username,
        password: encryptedPassword,
      })

      // Create token
      const token = signJwt({ username, _id: newUser._id })

      // return new user with token
      res.status(200).json({ _id: newUser._id, token })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  }
)

authHandler.post(
  '/login',
  async (req: Request<{}, {}, LoginInput['body']>, res: Response) => {
    try {
      // Get user input
      const { username, password } = req.body

      // Validate if user exist in our database
      const user = await getUserByUsername(username)

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = signJwt({ username, _id: user._id })

        // user
        return res.status(200).json({ _id: user._id, token })
      }
      return res.status(400).send('Invalid Credentials')
    } catch (err) {
      return res.status(500).send(err)
    }
  }
)

authHandler.get('/',
    async (req: Request, res: Response)=>{
    const userId = req.userId
    const user = await UserModel.findById(userId)
        if (user){
            return res.json({username:user.username})
        }
    }
)
export default authHandler