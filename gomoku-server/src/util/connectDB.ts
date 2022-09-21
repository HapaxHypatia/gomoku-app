import mongoose from 'mongoose'
import express from "express";

const connectDB = async () => {
  const dbUri = "mongodb+srv://"+process.env.NAME+":"+process.env.PASS+"@gomoku.5fuetji.mongodb.net/gomoku?retryWrites=true&w=majority"
  console.log(`⚡️[server]: Connecting to DB...`)
  try {
    await mongoose.connect(dbUri)
  } catch (error) {
    console.log('⚡️[server]: Could not connect to db')
    console.log(error)
    process.exit(1)
  }
}

export default connectDB