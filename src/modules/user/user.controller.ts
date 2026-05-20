import type { Request, Response } from "express";

const createUser = (req: Request, res: Response) => {
    const {name, email, passwrod, role} = req.body
};

export const userController = {
  createUser,
};
