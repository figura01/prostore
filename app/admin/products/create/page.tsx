import { Metadata } from "next";
import ProductForm from "@/components/admin/product-form";
export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductPage = () => {
  return (
    <div className="flex flex-col">
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </div>
  );
};

export default CreateProductPage;
