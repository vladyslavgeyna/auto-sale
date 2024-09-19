import { hash } from 'bcrypt';

export const getHashedString = async (str: string) => await hash(str, 3);
