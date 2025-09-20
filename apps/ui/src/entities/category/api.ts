import { CategoryDto } from '@finper/shared';
import { BaseService } from '@shared/api';

class CategoryService extends BaseService {
  getCategories(): Promise<CategoryDto[]> {
    return this.api.get();
  }

  addCategory(category: Omit<CategoryDto, 'id'>) {
    return this.api.post<CategoryDto>(category);
  }

  updateCategory(category: CategoryDto) {
    return this.api.put(`/${category.id}`, category);
  }

  deleteCategory(categoryId: string) {
    return this.api.delete(`/${categoryId}`);
  }
}

export const categoryService = new CategoryService('api/budget/categories');
