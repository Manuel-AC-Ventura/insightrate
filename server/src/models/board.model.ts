import { randomUUID } from 'crypto';
import { Board } from '../types/board.types';
import { PrismaClient } from '../generated/prisma/client'

export class BoardModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createBoard(board: Board): Promise<Board> {
    try {
      const newBoard = await this.prisma.board.create({
        data: {
          id: randomUUID(),
          name: board.name,
          slug: board.slug ?? '',
          description: board.description,
          private: board.private,
          ownerId: board.ownerId,
          createdAt: new Date(),
        },
      });
      return newBoard;
    } catch (error) {
      throw new Error('Error creating board');
    }
  }

  async getBoardBySlug(slug: string): Promise<Board | null> {
    try {
      const board = await this.prisma.board.findUnique({
        where: { slug },
        include: {
          suggestions: true,
        },
      });

      if (!board) {
        throw new Error('Portal não encontrado.');
      }
      return board;
    } catch (error) {
      throw new Error('Error fetching board');
    }
  }

  async getAllBoards(ownerId: string): Promise<Board[]> {
    try {
      const boards = await this.prisma.board.findMany({
        where: { ownerId },
        include: {
          suggestions: true,
        },
      });
      return boards;
    } catch (error) {
      throw new Error('Error fetching boards');
    }
  }

  async getBoardByIdentifier(identifier: string): Promise<Board | null> {
  try {
    const board = await this.prisma.board.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier }
        ],
      },
    });

    return board;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching board by identifier:', error.message);
    } else {
      console.error('Unknown error fetching board by identifier');
    }
    throw new Error('Error fetching board');
  }
}


  async deleteBoard(boardId: string): Promise<void> {
    try {
      await this.prisma.board.delete({
        where: { id: boardId },
      });
    } catch (error) {
      console.error('Error deleting board:', error);
      throw new Error('Error deleting board');
    }
  }
}