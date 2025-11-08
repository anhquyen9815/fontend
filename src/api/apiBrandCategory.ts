// apiProduct.ts
import type { AxiosResponse } from 'axios';
import apiClient from './apiClient'; // import instance axios của bạn
import type { OptionFilterProduct } from '@/types/product'
import type { BrandCategory, CreatBrandCategoryDTO, UpdateBrandCategoryDTO, Response, BulkInsertResult } from '@/types/brandCategory'
import { createApi } from './createApi';



// ----------------------------
// 🔹 API functions
// ----------------------------

// 1. Lấy danh sách sản phẩm
export const getBrandCategorys = async (): Promise<BrandCategory[]> => {
  const response: AxiosResponse<BrandCategory[]> = await apiClient.get('/BrandCategories');
  return response.data;
};

// 2. Lấy chi tiết sản phẩm theo id
export const getBrandCategoryDetail = async (id: number): Promise<BrandCategory> => {
  const response: AxiosResponse<BrandCategory> = await apiClient.get(`/BrandCategories/${id}`);
  return response.data;
};

// 3. Thêm sản phẩm mới
export const createBrandCategory = async (data: CreatBrandCategoryDTO): Promise<BrandCategory> => {
  const response: AxiosResponse<BrandCategory> = await apiClient.post('/BrandCategories', data);
  return response.data;
};

// 4. Cập nhật sản phẩm theo id
export const updateBrandCategory = async (id: number, data: UpdateBrandCategoryDTO): Promise<BrandCategory> => {
  const response: AxiosResponse<BrandCategory> = await apiClient.put(`/BrandCategories/${id}`, data);
  return response.data;
};

// 5. Xóa sản phẩm theo id
export const deleteBrandCategory = async (id: number): Promise<void> => {
  await apiClient.delete(`/BrandCategories/${id}`);
};

export const bulkInsertBrandCategorys = async (data: CreatBrandCategoryDTO[]): Promise<BulkInsertResult> => {
  const response: AxiosResponse<BulkInsertResult> = await apiClient.post('/BrandCategories/bulk-insert', data);
  return response.data;
};

export const brandCategoriesWithFilter = async (option: OptionFilterProduct): Promise<Response> => {
  const response: AxiosResponse<Response> = await apiClient.get('/BrandCategories/filter', { params: option });
  return response.data;
};

export const brandCategoryApi = createApi<BrandCategory, CreatBrandCategoryDTO, UpdateBrandCategoryDTO>('/BrandCategories');


