/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User, Category]), // Include Category
    AuthModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [TypeOrmModule], // Export repositories if needed elsewhere
})
export class EventsModule {}
