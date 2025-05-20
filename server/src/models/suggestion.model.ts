import { randomUUID } from 'crypto';
import { Suggestion } from '../types/suggestion.types';
import { PrismaClient } from '../generated/prisma/client';

export class SuggestionModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createSuggestion(suggestion: Suggestion): Promise<Suggestion> {
    try {
      const { votesCount, createdAt, ...data } = suggestion;
      const createdSuggestion = await this.prisma.suggestion.create({
        data: {
          ...data,
          id: randomUUID(),
          votesCount: 0,
          createdAt: new Date(),
        },
      });
    
      return {
        ...createdSuggestion,
        votesCount: createdSuggestion.votesCount ?? 0,
      };
    } catch (error) {
      throw new Error(`Error creating suggestion: ${error}`);
    }
  }

  async getAllSuggestions(): Promise<Suggestion[]> {
    try {
      const suggestions = await this.prisma.suggestion.findMany();
      return suggestions.map((suggestion) => ({
        ...suggestion,
        votesCount: suggestion.votesCount ?? 0,
      }));
    } catch (error) {
      throw new Error(`Error fetching suggestions: ${error}`);
    }
  }

  async updateSuggestion(suggestionId: string, suggestion: Suggestion): Promise<Suggestion> {
    try {
      const { id, votesCount, createdAt, ...data } = suggestion;
      const updatedSuggestion = await this.prisma.suggestion.update({
        where: { id: suggestionId },
        data,
      });
      return {
        ...updatedSuggestion,
        votesCount: updatedSuggestion.votesCount ?? 0,
      };
    } catch (error) {
      throw new Error(`Error updating suggestion: ${error}`);
    }
  }

  async deleteSuggestion(suggestionId: string, userId: string): Promise<void> {
    try {
      await this.prisma.suggestion.deleteMany({
        where: {
          id: suggestionId,
          authorId: userId,
        },
      });
    } catch (error) {
      throw new Error(`Error deleting suggestion: ${error}`);
    }
  }
}