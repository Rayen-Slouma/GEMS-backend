import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findOne(id: number): Promise<Event> {
    return this.eventRepository.findOneBy({ id });
  }

  create(event: Event): Promise<Event> {
    return this.eventRepository.save(event);
  }

  async update(id: number, event: Partial<Event>): Promise<Event> {
    await this.eventRepository.update(id, event);
    return this.eventRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
