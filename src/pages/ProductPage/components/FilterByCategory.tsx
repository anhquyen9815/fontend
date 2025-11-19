import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Button,
  useTheme,
  Typography,
} from "@mui/material";
import { useBrandCategoryHooks } from '@/hooks/brandCtegoryHooks';
import type { BrandCategory } from "@/types/brandCategory";
import type { OptionFilterProduct } from '@/types/product';

interface ProductFilterHeaderProps {
  categoryId: number;
  handleFilter: (option: OptionFilterProduct) => void,
  optionFilter: OptionFilterProduct,
}

const FilterByCategory: React.FC<ProductFilterHeaderProps> = ({ categoryId, handleFilter, optionFilter, }) => {
  const theme = useTheme();
  const { getFilteredBrandCategories, filteredBrandCategories, } = useBrandCategoryHooks();
  const [brandSelect, setBrandSelect] = useState<number>(0);

  const handleSelectBrand = (brandId: number) => {
    if (brandId == brandSelect) {
      const temp: OptionFilterProduct = {
        ...optionFilter,
        page: 1,
      }
      delete temp.brandId
      handleFilter(temp)
      setBrandSelect(0)
    } else {
      const temp: OptionFilterProduct = {
        ...optionFilter,
        page: 1,
        brandId: brandId
      }
      handleFilter(temp)
      setBrandSelect(brandId)

    }
  }


  useEffect(() => {
    getFilteredBrandCategories({ page: 1, size: 50, categoryId })
  }, [])

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Typography variant="subtitle1" fontWeight={700}>
        Thương hiệu
      </Typography>

      {/* ====== Danh sách thương hiệu ====== */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1}
        mt={1}
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
            onClick={() => handleSelectBrand(item.brandId)}
          >
            {item.brandName}
          </Button>
        ))}
      </Stack>

    </Box>
  );
};

export default FilterByCategory;
