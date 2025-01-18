import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column({ default: 'default.jpg' }) // Set a default profile picture
  profilePicture: string;

  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}
