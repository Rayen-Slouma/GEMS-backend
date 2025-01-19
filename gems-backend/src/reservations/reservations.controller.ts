/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.findOne(+id);
  }

  @Get('event/:eventId/seats')
  findReservedSeats(@Param('eventId') eventId: string): Promise<number[]> {
    return this.reservationsService.findReservedSeats(+eventId);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reservationsService.remove(+id);
  }
}