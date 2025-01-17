// search.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('events')
  async searchEvents(@Query('query') query: string) {
    return this.searchService.searchEvents(query);
  }
}
