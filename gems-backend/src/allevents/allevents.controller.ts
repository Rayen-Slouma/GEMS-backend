import { Controller, Get, Param } from '@nestjs/common';
import { AlleventsService } from './allevents.service';
import { Event } from 'src/events/entities/event.entity';

@Controller('allevents')
export class AlleventsController {
  constructor(private readonly alleventsService: AlleventsService) {}

  // Get all events
  @Get()
  findAll(): Promise<Event[]> {
    return this.alleventsService.findAll();
  }

  // Get events by category
  @Get(':category')
  findByCategory(@Param('category') category: string): Promise<Event[]> {
    return this.alleventsService.findByCategory(category);
  }
}
