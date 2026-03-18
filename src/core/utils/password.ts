import bcrypt from 'bcryptjs';

type HashPasswordParams = {
  password: string;
  salts?: number;
};

type ComparePasswordParams = {
  password: string;
  hash: string;
};

export function hashPassword({ password, salts = 10 }: HashPasswordParams) {
  return bcrypt.hashSync(password, salts);
}

export function comparePassword({ password, hash }: ComparePasswordParams) {
  return bcrypt.compareSync(password, hash);
}
