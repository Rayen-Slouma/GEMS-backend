// search.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity'; // Adjust according to your event model
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { EventsModule } from '../events/events.module'; // Adjust accordingly

@Module({
  imports: [TypeOrmModule.forFeature([Event]), EventsModule], // Ensure the EventModule is imported
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
