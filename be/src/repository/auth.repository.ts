import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthRepository = {
  async findAccountByEmail(email: string) {
    return await prisma.accounts.findFirst({
      where: {
        email: email,
      },
    });
  },

  async createAccount(name: string, email: string, password: string) {
    return await prisma.accounts.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
  },

  async findAccountById(id: string) {
    return await prisma.accounts.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        is_email_verified: true,
        created_at: true,
        updated_at: true,
      },
    });
  },
};
