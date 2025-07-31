import ProductList from "@/components/shared/products/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { convertToPlainObject } from "@/lib/utils";

const HomePage = async () => {
  // Fetch latest products
  const latestProducts = await getLatestProducts();

  // Convert rating from string to number
  const productsWithNumericRating = latestProducts.map(product => ({
    ...product,
    rating: Number(product.rating),
  }));

  return (
    <>
      <ProductList 
        data={productsWithNumericRating} 
        title="Newest Arrivals"
        limit={6}
      />
    </>
  );
};

export default HomePage;

