import { randomUUID } from 'crypto';
import { Vote } from '../types/vote.types';
import { PrismaClient } from '../generated/prisma';

export class VoteModel{
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createVote(vote: Vote): Promise<Vote> {
    try {
      const { suggestionId, userId } = vote;
      if (!suggestionId || !userId) {
        throw new Error('suggestionId and userId are required');
      }

      // Check if suggestion exists
      const suggestion = await this.prisma.suggestion.findUnique({
        where: { id: suggestionId },
      });
      if (!suggestion) {
        throw new Error('Suggestion does not exist');
      }

      // Check if the vote already exists
      const existingVote = await this.prisma.vote.findUnique({
        where: {
          suggestionId_userId: {
            suggestionId,
            userId,
          },
        },
      });
      if (existingVote) {
        throw new Error('User has already voted for this suggestion');
      }

      const createdVote = await this.prisma.vote.create({
        data: {
          id: randomUUID(),
          suggestionId,
          userId,
          createdAt: new Date(),
        },
      });
      return createdVote;
    } catch (error) {
      throw new Error(`Error creating vote: ${error}`);
    }
  }

  async getAllVotes(): Promise<Vote[]> {
    try {
      const votes = await this.prisma.vote.findMany();
      return votes;
    } catch (error) {
      throw new Error(`Error fetching votes: ${error}`);
    }
  }
}