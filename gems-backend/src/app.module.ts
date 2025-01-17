import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { LandingpageModule } from './landingpage/landingpage.module';
import { SearchModule } from './search/search.module';
import { AlleventsModule } from './allevents/allevents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'Gems',
      autoLoadEntities: true,
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    EventsModule,
    LandingpageModule,
    SearchModule,
    AlleventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
