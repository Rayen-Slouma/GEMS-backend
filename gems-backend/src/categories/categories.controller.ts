import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return await this.categoriesService.getAllCategories();
  }

  @Post()
  async createCategory(@Body('name') name: string) {
    return await this.categoriesService.createCategory(name);
  }
}
