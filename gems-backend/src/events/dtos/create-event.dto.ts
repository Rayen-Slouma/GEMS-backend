/* eslint-disable prettier/prettier */
import {
  IsString,
  IsDateString,
  IsNumber,
  IsArray,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  eventPicture?: string;

  @IsString()
  location: string;

  @IsEnum(['Sports', 'Music', 'Education', 'Technology', 'Health'])
  category: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  ticketLimit: number;

  @IsEnum(['online', 'onsite'])
  mode: string;

  @IsArray()
  @IsString({ each: true })
  organizers: string[];

  @IsString()
  @IsOptional()
  sectionColor?: string;

  @IsString()
  @IsOptional()
  textColor?: string;
}
