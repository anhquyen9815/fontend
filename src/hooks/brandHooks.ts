// useBrand.ts
import { useApi } from '@/api/useApi';
import type { Brand, CreateBrandDTO, UpdateBrandDTO } from '@/types/brand';

// export const brandHooks = useApi<Brand, CreateBrandDTO, UpdateBrandDTO>('/brands');
export const useBrandHooks= () => {
  return  useApi<Brand, CreateBrandDTO, UpdateBrandDTO>('/brands');
};

// import { productHooks } from '../api/useProduct';

// const ProductList = () => {
//   const { data: products, isLoading, error } = productHooks.useGetList();
//   const createMutation = productHooks.useCreate();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Lỗi: {(error as Error).message}</div>;

//   const handleAdd = () => {
//     createMutation.mutate({ name: 'Sản phẩm mới', price: 123 });
//   };

//   return (
//     <>
//       <button onClick={handleAdd}>Thêm sản phẩm</button>
//       <ul>
//         {products?.map(p => (
//           <li key={p.id}>{p.name} - ${p.price}</li>
//         ))}
//       </ul>
//     </>
//   );
// };