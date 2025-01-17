import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingpageService } from './landingpage.service';
import { LandingpageController } from './landingpage.controller'; // Import LandingpageController
import { Event } from '../events/entities/event.entity';  // Import Event entity

@Module({
  imports: [TypeOrmModule.forFeature([Event])],  // Add Event entity here
  providers: [LandingpageService],
  controllers: [LandingpageController], // Add LandingpageController here
  exports: [LandingpageService],
})
export class LandingpageModule {}