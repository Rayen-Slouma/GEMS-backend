/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';

import { Event } from '../../events/entities/event.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'default.jpg' }) // Set a default profile picture
  profilePicture: string;

  @ManyToMany(() => Event, (event) => event.organizers)
  events: Event[]; // Events organized by the user

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[]; // Reservations made by the user
}
