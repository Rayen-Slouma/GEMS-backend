import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Event } from '../../events/entities/event.entity';
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

  @Column()
  profilePicture: string;

  @ManyToMany(() => Event, (event) => event.organizers)
  events: Event[]; // Events organized by the user
}
