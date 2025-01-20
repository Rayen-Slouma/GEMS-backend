/* eslint-disable prettier/prettier */
import {
  IsString,
  IsDateString,
  IsNumber,
  IsArray,
  IsOptional,
  IsEnum,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  eventPicture?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(['Sports', 'Music', 'Education', 'Technology', 'Health'])
  @IsNotEmpty()
  category: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  ticketLimit: number;

  @IsEnum(['online', 'onsite'])
  @IsNotEmpty()
  mode: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  organizers: string[];

  @IsString()
  @IsOptional()
  sectionColor?: string;

  @IsString()
  @IsOptional()
  textColor?: string;
}
