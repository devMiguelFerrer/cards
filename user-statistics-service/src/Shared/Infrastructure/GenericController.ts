import { Body, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { AddGeneric } from '../Application/AddGeneric';
import { GetGeneric } from '../Application/GetGeneric';
import { RemoveGeneric } from '../Application/RemoveGeneric';
import { UpdateGeneric } from '../Application/UpdateGeneric';
import { EQueueEventType } from '../Domain/EQueueEventType';
import { IPublisher } from '../Domain/IPublisher';
import { CriteriaFormatted } from './CriteriaFormatted';
import { GenericRepository } from './GenericRepository';

export class GenericController<T extends { id: number }> {
  constructor(
    private repository: GenericRepository<T>,
    private queue: IPublisher<T>,
  ) {}

  @Get()
  async query(@Query() query: { criteria: string }) {
    const getGeneric = new GetGeneric(
      this.repository,
      new CriteriaFormatted(query),
    );
    return await getGeneric.dispatch();
  }

  @Post()
  async add(@Body() body: T) {
    const addGeneric = new AddGeneric(this.repository, body);
    const created = await addGeneric.dispatch();
    await this.queue.publish(created, EQueueEventType.ADD);
  }

  @Put()
  async update(@Body() body: T) {
    const updateGeneric = new UpdateGeneric(this.repository, body);
    const updated = await updateGeneric.dispatch();
    await this.queue.publish(updated, EQueueEventType.UPDATE);
  }

  @Delete()
  async remove(@Query('id') id: string) {
    const removeGeneric = new RemoveGeneric(this.repository, id);
    const deleted = await removeGeneric.dispatch();
    await this.queue.publish(deleted, EQueueEventType.REMOVE);
  }
}
