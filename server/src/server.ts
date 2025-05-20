import cors from '@fastify/cors';
import { fastify } from 'fastify';
import { UserRoute } from './routes/user.route';
import { AuthRoute } from './routes/auth.route';
import { BoardRoute } from './routes/board.route';
import { SuggestionRoute } from './routes/suggestion.route';
import { VoteRoute } from './routes/vote.route';
import { serializerCompiler, validatorCompiler, } from "fastify-type-provider-zod";

const app = fastify();
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials: true
}

const authRoute = new AuthRoute(app);
const userRoute = new UserRoute(app);
const boardRoute = new BoardRoute(app);
const suggestionRoute = new SuggestionRoute(app);
const voteRoute = new VoteRoute(app);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, corsOptions);
app.register(authRoute.routes.bind(authRoute));
app.register(userRoute.routes.bind(userRoute));
app.register(boardRoute.routes.bind(boardRoute));
app.register(suggestionRoute.routes.bind(suggestionRoute));
app.register(voteRoute.routes.bind(voteRoute));

try {
  app.listen({ port: process.env.PORT ? parseInt(process.env.PORT) : 5000 }).then(()=>{
    console.log(`Server is running on port ${process.env.PORT ? process.env.PORT : 5000}`);
  })
} catch (error) {
  console.error('Error starting server:', error);
  process.exit(1);
}