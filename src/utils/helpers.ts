import { NextApiRequest, NextApiResponse } from "next";
import { ResponseFunctions } from "./types";

export const getRequestMethod = (req: NextApiRequest): keyof ResponseFunctions => req.method as keyof ResponseFunctions

export const errorCatcher = (error: Error, res: NextApiResponse) => res.status(400).json({ error })