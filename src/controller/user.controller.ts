import type { Request, Response } from 'express'

export const createUser = (req: Request, res: Response) => {
    try {
        console.log(req.body)
        res.status(200).json({ message: "Success" })  // Add response
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })  // Add error response
    }
}

