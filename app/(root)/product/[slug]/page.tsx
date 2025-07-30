import Image from "next/image";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/actions/product.actions";


const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
     
    </div>
  );
};

export default ProductPage;
