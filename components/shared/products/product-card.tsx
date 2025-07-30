import { Product } from "@/types"
import Image from "next/image";
import Link from "next/link";
import { 
    Card, 
    CardContent, 
    CardHeader 
} from "@/components/ui/card";

import ProductPrice from "@/components/shared/products/product-price";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-col items-center">
                <Link href={`/products/${product.slug}`}>
                    <Image 
                        src={product.images[0]}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover mb-4 rounded"
                        priority={true}
                    />
                </Link>
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
                <div className="text-xs">{product.brand}</div>
                <Link href={`/products/${product.slug}`}>
                    <h2 className="text-sm font-medium hover:underline">{product.name}</h2>
                </Link>
                <div className="flex flex-between gap-4">
                    <p>{product.rating} Stars</p>
                    {product.stock > 0 ? (
                        <ProductPrice price={Number(product.price)} />
                    ) : (
                        <p className="text-destructive">Out of Stock</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default ProductCard;