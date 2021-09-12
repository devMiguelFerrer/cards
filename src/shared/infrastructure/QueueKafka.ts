import { IQueue } from "../domain/IQueue";

export class QueueKafka implements IQueue {
  constructor() {} // TODO: Kafka implementation
  send(data: any): void {}
}
