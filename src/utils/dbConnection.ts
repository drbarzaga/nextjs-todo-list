// Imports
import mongoose, { Model } from "mongoose";

// Database URL
const { DATABASE_URL } = process.env

// Connect function
export const connect = async () => {
    // Creating the connection object
    const connection = await mongoose.connect(DATABASE_URL as string).catch(error => console.log(error))
    console.log("Connection established...")

    // Creating the Todo Schema
    const todoSchema = new mongoose.Schema({
        item: String,
        completed: Boolean
    })

    // Creating the Todo Model
    const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)

    return { connection, Todo }
}