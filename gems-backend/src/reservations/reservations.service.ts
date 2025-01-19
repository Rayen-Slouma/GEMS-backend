/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '../users/entities/user.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const user = await this.usersRepository.findOneBy({ id: createReservationDto.userId });
    const event = await this.eventsRepository.findOneBy({ id: createReservationDto.eventId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Check if the seat is already reserved
    const existingReservation = await this.reservationsRepository.findOne({
      where: { event: { id: event.id }, seatNumber: createReservationDto.seatNumber },
    });

    if (existingReservation) {
      throw new ConflictException('Seat is already reserved');
    }

    // Check if there are available places
    const reservedSeatsCount = await this.reservationsRepository.count({ where: { event: { id: event.id } } });
    if (reservedSeatsCount >= event.ticketLimit) {
      throw new ConflictException('No available places');
    }

    const reservation = new Reservation();
    reservation.user = user;
    reservation.event = event;
    reservation.reservationDate = createReservationDto.reservationDate;
    reservation.seatNumber = createReservationDto.seatNumber;

    // Decrease the number of available places
    event.ticketLimit -= 1;
    await this.eventsRepository.save(event);

    return this.reservationsRepository.save(reservation);
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }

  findOne(id: number): Promise<Reservation> {
    return this.reservationsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.reservationsRepository.delete(id);
  }
}
