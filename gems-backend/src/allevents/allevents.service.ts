// allevents.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { EventCategory } from 'src/events/entities/event.entity'; // Import EventCategory enum

@Injectable()
export class AlleventsService {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find(); // Get all events
  }

  async findByCategory(category: string): Promise<Event[]> {
    // Cast category to EventCategory enum type
    return this.eventRepository.find({ where: { category: category as EventCategory } }); // Get events by category
  }
}
