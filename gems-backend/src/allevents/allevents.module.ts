import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { Category } from '../categories/entities/category.entity'; // Import Category entity
import { AlleventsService } from './allevents.service'; // Assuming your service is named AlleventsService
import { AlleventsController } from './allevents.controller'; // Assuming your controller is named AlleventsController
import { CategoriesModule } from '../categories/categories.module'; // Import CategoriesModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Category]), // Import Event and Category entities
    CategoriesModule, // Import CategoriesModule to access CategoryRepository
  ],
  providers: [AlleventsService],
  controllers: [AlleventsController],
})
export class AlleventsModule {}
