/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { LandingpageModule } from './landingpage/landingpage.module';
import { SearchModule } from './search/search.module';
import { AlleventsModule } from './allevents/allevents.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'Gems',
      autoLoadEntities: true,
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    EventsModule,
    LandingpageModule,
    SearchModule,
    AlleventsModule,
    AuthModule,
    CategoriesModule,
    ReservationsModule, // Import ReservationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
