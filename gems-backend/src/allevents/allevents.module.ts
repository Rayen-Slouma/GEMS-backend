import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlleventsService } from './allevents.service';
import { AlleventsController } from './allevents.controller';
import { Event } from '../events/entities/event.entity'; // Import Event entity

@Module({
  imports: [TypeOrmModule.forFeature([Event])], // Register Event entity
  controllers: [AlleventsController],
  providers: [AlleventsService],
})
export class AlleventsModule {}
