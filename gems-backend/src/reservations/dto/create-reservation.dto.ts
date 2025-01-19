/* eslint-disable prettier/prettier */

export class CreateReservationDto {
  userId: number;
  eventId: number;
  reservationDate: Date;
  seatNumber: string; // Add seat number
}