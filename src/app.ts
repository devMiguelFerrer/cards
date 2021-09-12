import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import * as path from "path";
import { GenericRepository } from "./shared/infrastructure/GenericRepository";
import { OwnerStaticsEntity } from "./owners/infrastructure/OwnerStaticsEntity";
import { GenericRouter } from "./shared/infrastructure/GenericRouter";
import { CardEntity } from "./cards/infrastructure/CardEntity";
import { UserStaticsEntity } from "./users/infrastructure/UserStaticsEntity";
import { QueueKafka } from "./shared/infrastructure/QueueKafka";

const app = express();

dotenv.config({ path: path.join(__dirname, "../.env") });

app.use(cors());

// TODO: Move routes to another file
const ownerRepository = new GenericRepository(OwnerStaticsEntity);
const ownerRouter = new GenericRouter("/owner-statics", ownerRepository, new QueueKafka());
app.use(ownerRouter.getRouter());

const cardRepository = new GenericRepository(CardEntity);
const cardRouter = new GenericRouter("/card", cardRepository, new QueueKafka());
app.use(cardRouter.getRouter());

const userStaticsRepository = new GenericRepository(UserStaticsEntity);
const userStaticsRouter = new GenericRouter("/user-statics", userStaticsRepository, new QueueKafka());
app.use(userStaticsRouter.getRouter());

export { app };
