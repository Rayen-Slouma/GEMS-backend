import { Controller, Get, Param } from '@nestjs/common';
import { AlleventsService } from './allevents.service';
import { Event } from 'src/events/entities/event.entity';
import { Category } from 'src/categories/entities/category.entity';

@Controller('allevents')
export class AlleventsController {
  constructor(private readonly alleventsService: AlleventsService) {}

  // Fetch all events
  @Get()
  async findAll(): Promise<Event[]> {
    console.log('Fetching all events');
    return this.alleventsService.findAll();
  }

  // Fetch events by category ID
  @Get('category/:id')
  async findByCategory(@Param('id') id: number): Promise<Event[]> {
    console.log(`Fetching events for category with ID: ${id}`);
    return this.alleventsService.findByCategory(id);
  }

  // Fetch all categories
  @Get('categories')
  async findAllCategories(): Promise<Category[]> {
    console.log('Fetching all categories');
    return this.alleventsService.findAllCategories();
  }
}
