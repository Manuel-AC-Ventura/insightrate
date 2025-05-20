import { Suggestion } from "../types/suggestion.types";
import { SuggestionModel } from "../models/suggestion.model";

export class SuggestionService {
  private suggestionModel: SuggestionModel;

  constructor() {
    this.suggestionModel = new SuggestionModel();
  }

  async createSuggestion(suggestion: Suggestion): Promise<Suggestion> {
    try {
      return await this.suggestionModel.createSuggestion(suggestion);
    } catch (error) {
      throw new Error(`Error in service while creating suggestion: ${error}`);
    }
  }

  async getAllSuggestions(): Promise<Suggestion[]> {
    try {
      return await this.suggestionModel.getAllSuggestions();
    } catch (error) {
      throw new Error(`Error in service while fetching suggestions: ${error}`);
    }
  }

  async updateSuggestion(suggestionId: string, suggestion: Suggestion): Promise<Suggestion> {
    try {
      return await this.suggestionModel.updateSuggestion(suggestionId, suggestion);
    } catch (error) {
      throw new Error(`Error in service while updating suggestion: ${error}`);
    }
  }

  async deleteSuggestion(suggestionId: string, userId: string): Promise<void> {
    try {
      await this.suggestionModel.deleteSuggestion(suggestionId, userId);
    } catch (error) {
      throw new Error(`Error in service while deleting suggestion: ${error}`);
    }
  }
}