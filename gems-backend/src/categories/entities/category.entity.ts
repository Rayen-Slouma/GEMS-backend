import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}
