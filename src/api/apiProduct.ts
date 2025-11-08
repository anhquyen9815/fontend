// apiProduct.ts
import type { AxiosResponse } from 'axios';
import apiClient from './apiClient'; // import instance axios của bạn
import type { Product, CreateProductDTO, UpdateProductDTO, BulkInsertResult, OptionFilterProduct, Response } from '@/types/product'
import { createApi } from './createApi';



// ----------------------------
// 🔹 API functions
// ----------------------------

// 1. Lấy danh sách sản phẩm
export const getProducts = async (): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await apiClient.get('/products');
  return response.data;
};

export const getProductsWithFilter = async (option:OptionFilterProduct): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await apiClient.get('/products', {params: option});
  return response.data;
};

// 2. Lấy chi tiết sản phẩm theo id
export const getProductDetail = async (id: number): Promise<Product> => {
  const response: AxiosResponse<Product> = await apiClient.get(`/products/${id}`);
  return response.data;
};

// 3. Thêm sản phẩm mới
export const createProduct = async (data: CreateProductDTO): Promise<Product> => {
  const response: AxiosResponse<Product> = await apiClient.post('/products', data);
  return response.data;
};

// 4. Cập nhật sản phẩm theo id
export const updateProduct = async (id: number, data: UpdateProductDTO): Promise<Product> => {
  const response: AxiosResponse<Product> = await apiClient.put(`/products/${id}`, data);
  return response.data;
};

// 5. Xóa sản phẩm theo id
export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};

export const bulkInsertProducts = async (data: CreateProductDTO[]): Promise<BulkInsertResult> => {
  const response: AxiosResponse<BulkInsertResult> = await apiClient.post('/products/bulk-insert', data);
  return response.data;
};

export const productsWithFilter = async (option: OptionFilterProduct): Promise<Response> => {
  const response: AxiosResponse<Response> = await apiClient.get('/products/filter', { params: option });
  return response.data;
};

export const productApi = createApi<Product, CreateProductDTO, UpdateProductDTO>('/products');


