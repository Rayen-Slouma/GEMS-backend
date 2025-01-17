import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import { MoreThanOrEqual } from 'typeorm';  // Import MoreThanOrEqual

@Injectable()
export class LandingpageService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getUpcomingEvents(): Promise<Event[]> {
    // Get the current date in "YYYY-MM-DD" format
    const currentDate = new Date().toISOString().split('T')[0];  // Format as string (YYYY-MM-DD)
    
    // Fetch upcoming events where startDate is greater than or equal to current date
    const events = await this.eventRepository.find({
      where: {
        startDate: MoreThanOrEqual(currentDate),  // Compare with the formatted string
      },
      order: {
        startDate: 'ASC',  // Order events by start date, ascending
      },
      take: 5,  // Limit the results (e.g., show 5 events)
    });

    return events;
  }
}