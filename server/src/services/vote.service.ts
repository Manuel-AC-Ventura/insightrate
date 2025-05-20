import { Vote } from "../types/vote.types";
import { VoteModel } from "../models/vote.model";

export class VoteService {
  private voteModel: VoteModel;

  constructor() {
    this.voteModel = new VoteModel();
  }

  async createVote(vote: Vote): Promise<Vote> {
    try {
      const { suggestionId, userId } = vote;
      const createdVote = await this.voteModel.createVote({
        suggestionId,
        userId,
      });
      return createdVote;
    } catch (error) {
      throw new Error(`Error creating vote: ${error}`);
    }
  }
}