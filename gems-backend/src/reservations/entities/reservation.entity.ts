/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, { eager: true })
  user: User;

  @ManyToOne(() => Event, (event) => event.reservations, { eager: true })
  event: Event;

  @Column('datetime')
  reservationDate: Date;

  @Column('int')
  seatNumber: number; // Store seat number as integer
}
