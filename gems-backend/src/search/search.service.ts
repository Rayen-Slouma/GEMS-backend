// search.service.ts
import { Injectable } from '@nestjs/common';
import { Event } from '../events/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async searchEvents(query: string): Promise<Event[]> {
    if (!query) {
      return [];  // Return empty array if no query is provided
    }

    return this.eventRepository
      .createQueryBuilder('event')
      .select([
        'event.id',
        'event.name',
        'event.location',
        'event.startDate',
        'event.startTime',
        'event.eventPicture',  // Make sure this is included
      ])
      .where('event.name LIKE :query OR event.location LIKE :query', { query: `%${query}%` })
      .getMany();
  }
}
