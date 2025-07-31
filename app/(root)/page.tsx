import ProductList from "@/components/shared/products/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { convertToPlainObject } from "@/lib/utils";

const HomePage = async () => {
  // Fetch latest products
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList 
        data={latestProducts} 
        title="Newest Arrivals"
        limit={6}
      />
    </>
  );
};

export default HomePage;

