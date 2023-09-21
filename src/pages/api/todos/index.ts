// This end-point handles 2 Request GET /todos (Get all todos) and POST /todos (Create a new todo)

import { connect } from "@/utils/dbConnection";
import { errorCatcher, getRequestMethod } from "@/utils/helpers";
import { ResponseFunctions } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Capture request method
    const method: keyof ResponseFunctions = getRequestMethod(req)

    // Potential Responses
    const handleCase: ResponseFunctions = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect() // Connect to database     
            res.json(await Todo.find({}).catch((error) => errorCatcher(error, res)))
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect() // Connect to database
            res.json(await Todo.create(req.body).catch((error) => errorCatcher(error, res)))
        }
    }

    // Check if there is a response for the particular method, if so invoked it, if not response with error
    const response = handleCase[method]
    return response ? response(req, res) : res.status(400).json({ error: "No response for this request" })
}

export default handler