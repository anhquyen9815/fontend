import React from 'react';
import { Button, Typography, Breadcrumbs, Box, Stack, Link } from '@mui/material';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useProductHooks } from '@/hooks/productHooks';
import { useCategoryHooks } from '@/hooks/categoryHooks';
import ProductImageGallery from './components/ProductImageGallery';
import { useLocation } from "react-router-dom";
import type { Product } from '@/types/product'
import ProductOptionSelector from './components/ProductOptionSelector';
import PromotionCard from './components/Promotion';
import CommitmentCard from './components/CommitmentCard';
import { SCREEN_PATH } from '@/constants/screenPaths';
import BreadcrumbNav, { type BreadcrumbItem } from '@/components/common/BreadcrumbNav';


const ProductDetail: React.FC = () => {
    const location = useLocation();
    const { product } = location.state as { product?: Product } || {};
    console.log('Quyen product', product)
    const { useGetList } = useProductHooks();
    const { useGetList: useGetListCategory } = useCategoryHooks();
    const { data: listProduct, } = useGetList(1, '', 5);
    const { data: listCategory, } = useGetListCategory(1, '', 50);
    const categoryName = product?.category?.name || ''
    const brandName = product?.brand?.name || ''
    const brandId = product?.brand?.id || 1
    const categoryId = product?.category?.id || 1
    const items: BreadcrumbItem[] = [
        { label: 'Trang chủ', href: "/" },
        { label: categoryName, href: SCREEN_PATH.PRODUCTPAGE, params: { categoryId, categoryName } },
        { label: `${categoryName} ${brandName}` },
    ];
    return (
        // Sử dụng Box cho container chính (Full Screen)
        <Box
            sx={{
                minHeight: '100vh',
                padding: 2,
                margin: 0,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1200px',
            }}
        >
            <BreadcrumbNav items={items} />

            {product && <Stack direction={{ xs: 'column', md: 'row', }} spacing={2}>
                {/* CỘT BÊN TRÁI */}
                <Stack spacing={2} flex={3}>
                    <ProductImageGallery
                        avatar={product.image || ''}
                        images={[
                            'https://cdnv2.tgdd.vn/mwg-static/dmx/Products/Images/1942/327172/google-tv-aqua-qled-4k-65-inch-aqt65s800ux-1-638645970371841104-700x467.jpg',
                            'https://cdnv2.tgdd.vn/mwg-static/dmx/Products/Images/1942/327172/google-tv-aqua-qled-4k-65-inch-aqt65s800ux-2-638645970383789617-700x467.jpg',
                            'https://cdnv2.tgdd.vn/mwg-static/dmx/Products/Images/1942/327172/google-tv-aqua-qled-4k-65-inch-aqt65s800ux-3-638645970392969071-700x467.jpg',
                            'https://cdnv2.tgdd.vn/mwg-static/dmx/Products/Images/1942/327172/google-tv-aqua-qled-4k-65-inch-aqt65s800ux-10-638645970680559782-700x467.jpg',
                            'https://cdnv2.tgdd.vn/mwg-static/dmx/Products/Images/1942/327172/google-tv-aqua-qled-4k-65-inch-aqt65s800ux-13-638645970703846588-700x467.jpg'
                        ]} />
                    <CommitmentCard />
                </Stack>

                {/* CỘT BÊN PHẢI */}
                <Stack spacing={1} flex={2}>
                    <ProductOptionSelector
                        productDetail={product}
                        rating={4.8}
                        reviewCount={17}
                        versions={[
                            { label: "256GB", price: 37990000 },
                            { label: "512GB", price: 44490000 },
                            { label: "1TB", price: 50990000 },
                            { label: "2TB", price: 63990000 },
                        ]}
                        colors={[
                            { label: "Cam Vũ Trụ", price: 37990000 },
                            { label: "Xanh Đậm", price: 37990000 },
                            { label: "Bạc", price: 37990000 },
                        ]}
                        warranties={[
                            { label: "1 đổi 1 12 tháng", priceDiff: 0, isDefault: true },
                            { label: "1 đổi 1 24 tháng", priceDiff: 1200000 },
                        ]}
                        onOrder={() => alert("Đặt hàng thành công!")}
                    />
                    <PromotionCard />
                </Stack>

            </Stack>}

        </Box>
    );
};

export default ProductDetail;