import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import SellIcon from "@mui/icons-material/Sell";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useBrandCategoryHooks } from '@/hooks/brandCtegoryHooks';
import type { BrandCategory } from "@/types/brandCategory";
import type { OptionFilterProduct, Product } from '@/types/product';

interface ProductFilterHeaderProps {
  categoryId: number;
  setOptionFilter: (option: OptionFilterProduct) => void,
  optionFilter: OptionFilterProduct
}

const ProductFilterHeader: React.FC<ProductFilterHeaderProps> = ({ categoryId, setOptionFilter, optionFilter }) => {
  const theme = useTheme();
  const { getFilteredBrandCategories, filteredBrandCategories, } = useBrandCategoryHooks();
  const [sort, setSort] = useState("Desc");
  const [brandSelect, setBrandSelect] = useState<number>(0);

  useEffect(() => {
    const temp: OptionFilterProduct = {
      ...optionFilter,
      sortBy: sort == 'discount' ? 'DiscountPercent' : 'DiscountPrice',
      sortOrder: sort == 'discount' ? 'Desc' : (sort == 'Desc' ? 'Desc' : 'Asc'),
      brandId: brandSelect
    }
    setOptionFilter(temp)
  }, [brandSelect, sort])

  const handleSortChange = (
    event: React.MouseEvent<HTMLElement>,
    newSort: string
  ) => {
    if (newSort !== null) setSort(newSort);
  };

  useEffect(() => {
    getFilteredBrandCategories({ page: 1, size: 50, categoryId })
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      {/* ====== Tiêu đề và mô tả ====== */}
      <Typography variant="h5" fontWeight={700}>
        Điện thoại - Apple iPhone, Samsung, Xiaomi, Nokia, Tecno..
      </Typography>

      <Typography variant="body2" color="text.secondary" mt={0.5}>
        Mua điện thoại tại Clickbuy giá rẻ hơn bao giờ hết - săn khuyến mãi với
        những giờ vàng chạy chương trình quý khách sẽ được nhiều ưu đãi bất ngờ
      </Typography>

      <Typography variant="body2" mt={1}>
        <b>Điện thoại chính hãng</b> và <b>thu cũ đổi mới</b> của Clickbuy bảo
        hành <b>1 đổi 1</b>
      </Typography>

      {/* ====== Danh sách thương hiệu ====== */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1}
        mt={2}
        useFlexGap
        alignItems="center"
      >
        {filteredBrandCategories?.items.map((item: BrandCategory) => (
          <Button
            key={item.id}
            variant={brandSelect == item.brandId ? "contained" : "outlined"}
            size="small"
            sx={{
              borderRadius: 2,
              textTransform: "uppercase",
              fontWeight: 600,
              borderColor:
                brandSelect == item.brandId ? theme.palette.primary.main : "divider",
              color: brandSelect == item.brandId ? "white" : "text.primary",
              bgcolor: brandSelect == item.brandId ? theme.palette.primary.main : "transparent",
              "&:hover": {
                bgcolor:
                  brandSelect == item.brandId
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
              },
            }}
            onClick={() => setBrandSelect(brandSelect == item.brandId ? brandSelect : item.brandId)}
          >
            {item.brandName}
          </Button>
        ))}
      </Stack>

      {/* ====== Bộ lọc & Sắp xếp ====== */}
      <Box mt={4}>
        {/* <Typography variant="subtitle1" fontWeight={700}>
          Chọn tiêu chí
        </Typography>

        <Stack direction="row" spacing={1.5} mt={1.5} flexWrap="wrap" useFlexGap>
          <PriceFilter />
          <Button
            variant="outlined"
            endIcon={<ArrowDownwardIcon />}
            sx={{ borderRadius: 2 }}
          >
            Giá
          </Button>

          <Button variant="outlined" sx={{ borderRadius: 2 }}>
            Bộ nhớ trong
          </Button>

          <Button variant="outlined" sx={{ borderRadius: 2 }}>
            Dung lượng
          </Button>
        </Stack> */}

        <Typography variant="subtitle1" fontWeight={700} mt={3}>
          Sắp xếp theo
        </Typography>

        <ToggleButtonGroup
          exclusive
          value={sort}
          onChange={handleSortChange}
          sx={{
            mt: 1.5,
            gap: 1,
            flexWrap: "wrap",
            "& .MuiToggleButton-root": {
              borderRadius: 2,
              textTransform: "none",
              px: { xs: 0.6, sm: 0.8, md: 1 },
              py: { xs: 0.6, sm: 0.8, md: 1 },
              borderColor: "divider",
              "&.Mui-selected": {
                borderColor: "error.main",
                color: "error.main",
                bgcolor: "rgba(255,0,0,0.05)",
              },
            },
          }}
        >
          <ToggleButton value="Desc" sx={{
            fontSize: {
              xs: "0.7rem", // điện thoại
              sm: "0.8rem", // tablet
              md: "0.9rem", // desktop
            },
            whiteSpace: "nowrap", // tránh xuống dòng
            px: { xs: 1, sm: 2 },
          }}>
            <ArrowDownwardIcon sx={{ mr: 0.5, fontSize: { xs: 16, sm: 18, md: 20 } }} />
            Giá Cao - Thấp
          </ToggleButton>
          <ToggleButton value="Asc" sx={{
            fontSize: {
              xs: "0.7rem", // điện thoại
              sm: "0.8rem", // tablet
              md: "0.9rem", // desktop
            },
            whiteSpace: "nowrap", // tránh xuống dòng
            px: { xs: 1, sm: 2 },
          }}>
            <ArrowDownwardIcon sx={{ mr: 0.5, transform: "rotate(180deg)", fontSize: { xs: 16, sm: 18, md: 20 } }} />
            Giá Thấp - Cao
          </ToggleButton>
          <ToggleButton value="discount" sx={{
            fontSize: {
              xs: "0.7rem", // điện thoại
              sm: "0.8rem", // tablet
              md: "0.9rem", // desktop
            },
            whiteSpace: "nowrap", // tránh xuống dòng
            px: { xs: 1, sm: 2 },
          }}>
            <SellIcon sx={{ mr: 0.5, fontSize: { xs: 16, sm: 18, md: 20 } }} />
            Giảm giá
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default ProductFilterHeader;
