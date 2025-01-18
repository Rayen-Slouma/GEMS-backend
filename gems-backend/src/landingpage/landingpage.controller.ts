import { Controller, Get } from '@nestjs/common';
import { LandingpageService } from './landingpage.service';
import { Event } from '../events/entities/event.entity'; // Adjust path

@Controller('landingpage')
export class LandingpageController {
  constructor(private readonly landingpageService: LandingpageService) {}

  @Get('upcoming-events')
  async getUpcomingEvents(): Promise<Event[]> {
    return this.landingpageService.getUpcomingEvents();
  }
}