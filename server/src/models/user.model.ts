import { randomUUID } from 'crypto';
import { User } from '../types/user.types';
import { PrismaClient } from '../generated/prisma/client';

export class UserModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    }
    catch (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }
  }

  async create(user: User): Promise<User> {
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          id: randomUUID(),
          name: user.name ?? '',
          email: user.email ?? '',
          password: user.password ?? '',
        },
      });
      console.log(createdUser);
      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const isMatch = await this.prisma.user.findFirst({
        where: {
          password: hashedPassword,
          AND: {
            password: password,
          },
        },
      });
      return isMatch !== null;
    } catch (error) {
      console.error('Error comparing password:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}