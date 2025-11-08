export const toSlug = (text: string): string => {
  return text
    .toLowerCase() // chuyển thường
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .replace(/[^a-z0-9\s-]/g, '') // xóa ký tự đặc biệt
    .trim() // bỏ khoảng trắng đầu/cuối
    .replace(/\s+/g, '-') // thay khoảng trắng bằng dấu -
    .replace(/-+/g, '-'); // gộp nhiều dấu - thành 1
};
