// ProductImageGallery.tsx
import React, { useState } from "react";
import { Box, IconButton, CardMedia, Stack, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Star } from "@mui/icons-material";

interface ProductImageGalleryProps {
    images: string[];
    featured?: boolean; // có tag "Nổi bật" không
    avatar: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
    images,
    featured = false,
    avatar
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const size = { xs: 40, sm: 60, md: 70 }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                // bgcolor: "background.paper",
                // bgcolor: "red",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                py: 1,

            }}
        >
            {/* Ảnh chính */}
            <Box sx={{ position: "relative", }}>
                <CardMedia
                    component="img"
                    image={images[currentIndex]}
                    alt={`image-${currentIndex}`}
                    sx={{
                        width: "80%",
                        objectFit: 'contain',
                        borderRadius: 2,
                        mx: 'auto',
                        mb: 2,
                        height: { xs: 250, md: 'auto'},

                    }}
                />

                {/* Tag nổi bật */}
                {featured && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            bgcolor: "white",
                            borderRadius: "8px",
                            px: 1,
                            py: 0.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            boxShadow: 1,
                        }}
                    >
                        <Star sx={{ fontSize: 18, color: "orange" }} />
                        <Typography variant="caption" fontWeight={600}>
                            Nổi bật
                        </Typography>
                    </Box>
                )}

                {/* Nút điều hướng */}
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: 8,
                        transform: "translateY(-50%)",
                        bgcolor: "rgba(255,255,255,0.7)",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.9)", boxShadow: "0 3px 8px rgba(0,0,0,0.3)", },
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                    }}
                >
                    <ChevronLeft />
                </IconButton>

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: 8,
                        transform: "translateY(-50%)",
                        bgcolor: "rgba(255,255,255,0.7)",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.9)", boxShadow: "0 3px 8px rgba(0,0,0,0.3)", },
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                    }}
                >
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* Thumbnail bên dưới */}
            <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                sx={{
                    p: 1,
                    overflowX: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {/* // onClick={() => setCurrentIndex(index)} */}
                {images.map((src, i) => (
                    <Box
                        key={i}
                        component="li"
                        onClick={() => setCurrentIndex(i)}
                        sx={{
                            flex: "0 0 auto",
                            width: { xs: size.xs, sm: size.sm, md: size.md },
                            height: { xs: size.xs, sm: size.sm, md: size.md },
                            borderRadius: 2,                // bo góc nhẹ
                            border: i === currentIndex ? "2px solid #1976d2" : "1px solid #e0e0e0",
                            backgroundColor: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxSizing: "border-box",
                            // padding: 1,                   // khoảng cách để ảnh không sát mép
                            transition: "all 160ms ease",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src={src}
                            alt={`thumb-${i}`}
                            sx={{
                                width: "90%",          // ảnh nhỏ hơn ô, nằm giữa
                                height: "90%",
                                objectFit: "contain", // giữ nguyên tỉ lệ
                                display: "block",
                                userSelect: "none",
                                pointerEvents: "none",
                            }}
                        />
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default ProductImageGallery;
