export interface IQueue {
  send(channel: string, data: any): void;
}
