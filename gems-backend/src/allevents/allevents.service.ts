import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class AlleventsService {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  // Fetch all events
async findAll(): Promise<Event[]> {
    const events = await this.eventRepository.find();
    if (!events.length) {
      console.log('No events found');
    }
    return events;
  }
  
  // Fetch all categories
  async findAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    if (!categories.length) {
      console.log('No categories found');
    }
    return categories;
  }

  // Fetch events by category
  async findByCategory(categoryId: number): Promise<Event[]> {
    // Check if the category exists
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Fetch events associated with this category
    return this.eventRepository.find({
      where: { category: category },
      relations: ['category'], // Make sure to load category relation
    });
  }

  
}
