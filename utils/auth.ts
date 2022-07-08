import { compare, hash } from 'bcryptjs';

export const hashPassword = async (password: string) => await hash(password, 12);

export const verifyPassword = async (password: string, hashedPassword: string) => await compare(password, hashedPassword);
