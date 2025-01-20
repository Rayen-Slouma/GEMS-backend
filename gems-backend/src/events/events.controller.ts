/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  NotFoundException,
  Patch,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { User } from '../users/entities/user.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  async getAllEvents(@Query('organizerId') organizerId: string) {
    if (organizerId) {
      return this.eventsService.findAllByOrganizer(parseInt(organizerId, 10));
    }
    return this.eventsService.findAll();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    const event = await this.eventsService.findById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  @Get(':id/organizers')
  async getOrganizersByEventId(@Param('id') id: string): Promise<User[]> {
    return this.eventsService.getOrganizersByEventId(parseInt(id, 10));
  }

  @Patch(':id')
  async updateEvent(@Param('id') id: string, @Body() updateEventData: any) {
    const updatedEvent = await this.eventsService.updateEvent(id, updateEventData);
    if (!updatedEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return updatedEvent;
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    const result = await this.eventsService.deleteEvent(id);
    if (!result) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return { message: `Event with id ${id} successfully deleted` };
  }
}
