import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Use a relative path to the User entity
import { Category } from '../../categories/entities/category.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string; // Event name/title

  @Column('text')
  description: string; // Event description

  @Column({ length: 255 })
  location: string; // Event location

  @Column({ length: 255, nullable: true })
  eventPicture: string; // Cover photo URL

  @ManyToOne(() => Category, (category) => category.events, { eager: true })
  category: Category; // Relationship with the Category entity

  @Column('datetime')
  startDate: Date; // Start date and time

  @Column('datetime')
  endDate: Date; // End date and time

  @Column('int')
  ticketLimit: number; // Ticket limit

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // Ticket price

  @Column({ length: 50 })
  mode: string; // Event mode (e.g., 'online' or 'onsite')

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable({
    name: 'event_organizers', // Name of the join table
    joinColumn: { name: 'eventId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  organizers: User[]; // List of organizers

  @Column({ length: 7, default: '#ffffff' })
  sectionColor: string; // Section background color (hex code)

  @Column({ length: 7, default: '#000000' })
  textColor: string; // Text color (hex code)

  @Column('boolean', { default: true })
  isActive: boolean; // Whether the event is active
}