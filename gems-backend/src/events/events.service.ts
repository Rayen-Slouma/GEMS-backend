import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { organizers, category, ...eventData } = createEventDto;

    // Resolve organizers (convert string IDs to User entities)
    const organizerEntities = await this.userRepository.findByIds(organizers);

    if (organizerEntities.length !== organizers.length) {
      throw new Error('Some organizers could not be found');
    }

    // Resolve category (find or create a category by name)
    let categoryEntity = await this.categoryRepository.findOne({
      where: { name: category },
    });

    if (!categoryEntity) {
      categoryEntity = this.categoryRepository.create({ name: category });
      categoryEntity = await this.categoryRepository.save(categoryEntity);
    }

    // Create a new event
    const newEvent = this.eventRepository.create({
      ...eventData,
      organizers: organizerEntities,
      category: categoryEntity,
    });

    // Save the event
    return await this.eventRepository.save(newEvent);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['organizers', 'category'], // Include relations if needed
    });
  }

  async findById(id: string): Promise<Event | null> {
    return this.eventRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['organizers', 'category'], // Include relations if needed
    });
  }
}
