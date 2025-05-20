import { FastifyRequest, FastifyReply } from "fastify";
import { VoteService } from "../services/vote.service";
import { voteSchema } from "../validators/vote.validator";
import { TokenService } from "../services/token.service";

export class VoteController {
  private voteService = new VoteService();
  private tokenService = new TokenService();

  async createVote(req: FastifyRequest, res: FastifyReply) {
    try {
      let userId: string | undefined;

      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const decoded = this.tokenService.verifyToken(token);
        userId = decoded.id;
      }

      const vote = await voteSchema.parseAsync(req.body);

      if (!vote.userId && userId) {
        vote.userId = userId;
      }

      const createdVote = await this.voteService.createVote(vote);
      return res.status(201).send(createdVote);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
