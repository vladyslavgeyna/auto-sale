import * as bcrypt from 'bcrypt';

export const getHashedString = async (str: string) => await bcrypt.hash(str, 3);
