// This end-point handles 3 Request 
// GET /todos/:id (Get todo detail) 
// PUT /todos/:id (Update a todo)
// DELETE /todos/:id (Delete a todo)

import { NextApiRequest, NextApiResponse } from "next";
import { ResponseFunctions, Todo } from '../../../utils/types';
import { errorCatcher, getRequestMethod } from "@/utils/helpers";
import { connect } from "@/utils/dbConnection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Capture the request method
    const method: keyof ResponseFunctions = getRequestMethod(req)    

    // Grab id from query.id
    const id: string = req.query.id as string

    // Potential responses for /todos/:id
    const handleCase: ResponseFunctions = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect()
            res.json(await Todo.findById(id).catch((error) => errorCatcher(error, res)))
        },
        PUT:async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect()
            res.json(await Todo.findByIdAndUpdate(id, req.body, { new: true }).catch((error) => errorCatcher(error, res)))
        },
        DELETE:async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect()
            res.json(await Todo.findByIdAndRemove(id).catch(error => errorCatcher(error, res)))
        }
    }

    // Check if there is a response for the particular method, if so invoked it, if not response with error
    const response = handleCase[method]
    return response ? response(req, res) : res.status(400).json({ error: "No response for this request" })
}

export default handler