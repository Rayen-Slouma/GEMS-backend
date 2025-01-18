import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async searchEvents(query: string): Promise<Event[]> {
    if (!query) {
      return []; // Return an empty array if no query is provided
    }

    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.category', 'category') // Include the category relation
      .leftJoinAndSelect('event.organizers', 'organizers') // Include the organizers relation
      .select([
        'event.id',
        'event.name',
        'event.location',
        'event.startDate',
        'event.endDate',
        'event.eventPicture',
        'event.price',
        'category.id',
        'category.name', // Assuming Category has a 'name' field
      ])
      .where('event.name LIKE :query', { query: `%${query}%` })
      .orWhere('event.location LIKE :query', { query: `%${query}%` })
      .orWhere('category.name LIKE :query', { query: `%${query}%` }) // Search in category name
      .getMany();
  }
}
