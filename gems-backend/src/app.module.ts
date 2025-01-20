/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { LandingpageModule } from './landingpage/landingpage.module';
import { SearchModule } from './search/search.module';
import { AlleventsModule } from './allevents/allevents.module';
import { ReservationsModule } from './reservations/reservations.module';
import { User } from './users/entities/user.entity';
import { Event } from './events/entities/event.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Event, Reservation, Category],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    EventsModule,
    LandingpageModule,
    SearchModule,
    AlleventsModule,
    AuthModule,
    CategoriesModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
