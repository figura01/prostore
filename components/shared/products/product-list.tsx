"use client";

import { Product } from "@/types";
import ProductCard from "@/components/shared/products/product-card";

const ProductList = ({ 
    data, 
    title,
    limit
}: { 
    data:  Product[], 
    title: string,
    limit?: number
}) => {
    const limitedData = limit ? data.slice(0, limit) : data;

    return (
        <div className="my-10">
            <h2 className="h2-bold mb-4">{title}</h2>
            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols_2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {limitedData.map((product: Product) => (
                        <ProductCard key={product.slug} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No products found</p>
            )}
        
        </div>
    );
};

export default ProductList;