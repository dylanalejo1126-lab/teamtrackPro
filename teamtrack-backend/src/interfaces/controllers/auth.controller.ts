import { Request, Response } from "express";
import { UsuarioRepositoryImpl } from "../../infrastructure/prisma/usuario.repository.impl";
import { Register } from "../../application/use-cases/register.usecase";
import { Login } from "../../application/use-cases/login.usecase";

const repo = new UsuarioRepositoryImpl();

const registerUseCase = new Register(repo);
const loginUseCase = new Login(repo);

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUseCase.ejecutar(req.body);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUseCase.ejecutar(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};