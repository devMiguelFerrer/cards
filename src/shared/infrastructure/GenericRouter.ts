import express, { RequestHandler, Router } from "express";
import { IGenericRepository } from "../domain/IGenericRepository";
import { IQueue } from "../domain/IQueue";

export class GenericRouter<T> {
  private middlewares = [];
  constructor(private route: string, private repo: IGenericRepository<T>, private queue: IQueue) {}

  setMiddlewares(handlers: RequestHandler<any>[]) {
    this.middlewares = handlers;
    return this;
  }

  getRouter(): Router {
    const router = express.Router();

    router.get(
      this.route,
      ...this.middlewares,
      async (req: express.Request, res: express.Response) => {
        const criteria: any = req.query.criteria; // TODO: Handle criteria
        return await this.repo.query(criteria);
      }
    );

    router.post(
      this.route,
      ...this.middlewares,
      async (req: express.Request, res: express.Response) => {
        const created = await this.repo.add(req.body); // TODO: Handle body
        this.queue.send('channel', created); // send create event
      }
    );

    router.put(
      this.route,
      ...this.middlewares,
      async (req: express.Request, res: express.Response) => {
        const updated =  this.repo.update(req.body); // TODO: Handle body
        this.queue.send('channel', updated); // send update event
      }
    );

    router.delete(
      this.route,
      ...this.middlewares,
      async (req: express.Request, res: express.Response) => {
        const removed = this.repo.remove(req.query.id as string); // TODO: Handle params
        this.queue.send('channel', removed); // send remove event
      }
    );

    return router;
  }
}
