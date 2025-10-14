import ProductList from "@/components/shared/products/product-list";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/product.actions";

import ProductCarousel from "@/components/shared/products/product-carousel";
import ViewAllProductsButton from "@/components/view-all-products-button";
import IconBoxes from "@/components/icon-boxes";
import DealCountdown from "@/components/deal-countdown";

const HomePage = async () => {
  // Fetch latest products
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  // Convert rating from string to number
  const productsWithNumericRating = latestProducts.map((product) => ({
    ...product,
    rating: Number(product.rating),
  }));

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel
          data={featuredProducts.map((product) => ({
            ...product,
            rating: Number(product.rating),
          }))}
        />
      )}
      <ProductList
        data={productsWithNumericRating}
        title="Newest Arrivals"
        limit={6}
      />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </>
  );
};

export default HomePage;
