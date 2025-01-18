import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), EventsModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
