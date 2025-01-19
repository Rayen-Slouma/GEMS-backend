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
      where: { event: { id: event.id }, seatNumber: parseInt(createReservationDto.seatNumber, 10) },
    });

    if (existingReservation) {
      throw new ConflictException('Seat is already reserved');
    }

    const reservation = new Reservation();
    reservation.user = user;
    reservation.event = event;
    reservation.reservationDate = createReservationDto.reservationDate;
    reservation.seatNumber = parseInt(createReservationDto.seatNumber, 10);

    return this.reservationsRepository.save(reservation);
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }

  findOne(id: number): Promise<Reservation> {
    return this.reservationsRepository.findOneBy({ id });
  }

  async findReservedSeats(eventId: number): Promise<number[]> {
    const reservations = await this.reservationsRepository.find({ where: { event: { id: eventId } } });
    return reservations.map(reservation => reservation.seatNumber);
  }

  async remove(id: number): Promise<void> {
    await this.reservationsRepository.delete(id);
  }
}
