import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Define the enum for categories
export enum EventCategory {
  MUSIC = 'Music',
  CONCERT = 'Concert',
  CINEMA = 'Cinema',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column({ length: 255 })
  location: string;

  @Column({ length: 255, nullable: true })
  eventPicture: string;

  // Use the enum for the category field
  @Column({
    type: 'enum',
    enum: EventCategory,
  })
  category: EventCategory;

  @Column('date')
  startDate: string;

  @Column('time')
  startTime: string;

  @Column('date')
  endDate: string;

  @Column('time')
  endTime: string;

  @Column('int')
  numberOfPlacesAvailable: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
