/* eslint-disable prettier/prettier */
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
       const { category,organizer, ...eventData } = createEventDto;

  

    // Find or create the category
    let categoryEntity = await this.categoryRepository.findOne({
      where: { name: category },
    });

    if (!categoryEntity) {
      categoryEntity = this.categoryRepository.create({ name: category });
      categoryEntity = await this.categoryRepository.save(categoryEntity);
    }
    const userEntity = await this.userRepository.findOne({
      where: { id: organizer},
    });

    // Create the new event
    const newEvent = this.eventRepository.create({
      ...eventData,
      category: categoryEntity,
      organizer: userEntity,
    });

    // Save the event in the database
    return await this.eventRepository.save(newEvent);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['organizer', 'category'],
    });
  }

  async findById(id: string): Promise<Event | null> {
    return this.eventRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['organizer', 'category'],
    });
  }

  async updateEvent(id: string, updateEventData: any): Promise<Event | null> {
    const event = await this.eventRepository.findOne({ where: { id: parseInt(id, 10) } });

    if (!event) {
      return null; // If the event does not exist, return null
    }

    // Update the event with the received data (without modifying the organizer)
    const { name, description, location, startDate, endDate, ticketLimit, price, mode, sectionColor, textColor, isActive, category } = updateEventData;

    event.name = name || event.name;
    event.description = description || event.description;
    event.location = location || event.location;
    event.startDate = startDate || event.startDate;
    event.endDate = endDate || event.endDate;
    event.ticketLimit = ticketLimit || event.ticketLimit;
    event.price = price || event.price;
    event.mode = mode || event.mode;
    event.sectionColor = sectionColor || event.sectionColor;
    event.textColor = textColor || event.textColor;
    event.isActive = isActive !== undefined ? isActive : event.isActive;

    // Handle category update
    if (category) {
      let categoryEntity = await this.categoryRepository.findOne({ where: { name: category } });
      if (!categoryEntity) {
        categoryEntity = this.categoryRepository.create({ name: category });
        categoryEntity = await this.categoryRepository.save(categoryEntity);
      }
      event.category = categoryEntity;
    }

    // Save the updated event in the database
    return await this.eventRepository.save(event);
  }

  async deleteEvent(id: string): Promise<boolean> {
    const deleteResult = await this.eventRepository.delete({ id: parseInt(id, 10) });
    return deleteResult.affected > 0; // Returns true if a row was deleted
  }
}
