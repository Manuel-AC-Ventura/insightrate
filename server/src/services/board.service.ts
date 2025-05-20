import { BoardModel } from "../models/board.model";
import { Board } from "../validators/board.validator";

export class BoardService {
  private boardModel: BoardModel;

  constructor() {
    this.boardModel = new BoardModel();
  }

  async createBoard(board: Board): Promise<Board> {
    try {
      const newBoard = await this.boardModel.createBoard(board);
      return newBoard;
    } catch (error) {
      throw new Error("Error creating board");
    }
  }

  async getBoardBySlug(slug: string): Promise<Board | null> {
    try {
      const board = await this.boardModel.getBoardBySlug(slug);
      return board;
    } catch (error) {
      throw new Error("Error fetching board");
    }
  }

  async getAllBoards(ownerId: string): Promise<Board[]> {
    try {
      const boards = await this.boardModel.getAllBoards(ownerId);
      return boards;
    } catch (error) {
      throw new Error("Error fetching boards");
    }
  }

  async deleteBoard(identifier: string, userId: string): Promise<boolean> {
    try {
      const board = await this.boardModel.getBoardByIdentifier(identifier);

      if (!board || board.ownerId !== userId) return false;

      if (!board.id) return false;

      await this.boardModel.deleteBoard(board.id);

      return true; 
    } catch (error) {
      console.error('Error deleting board:', error);
      throw new Error('Error deleting board');
    }
  }
}