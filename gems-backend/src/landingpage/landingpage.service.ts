import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';  // Import MoreThanOrEqual
import { Event } from '../events/entities/event.entity';

@Injectable()
export class LandingpageService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getUpcomingEvents(): Promise<Event[]> {
    // Get the current date as a Date object
    const currentDate = new Date();

    // Fetch upcoming events where startDate is greater than or equal to the current date
    const events = await this.eventRepository.find({
      where: {
        startDate: MoreThanOrEqual(currentDate), // Compare with Date object
      },
      order: {
        startDate: 'ASC',  // Order events by start date, ascending
      },
      take: 5,  // Limit the results (e.g., show 5 events)
    });

    return events;
  }
}
