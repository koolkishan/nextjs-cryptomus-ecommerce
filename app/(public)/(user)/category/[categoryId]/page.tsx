import { CategoryProducts } from "@/components/user";
import { getProductsFormCategoryId } from "@/data/product";
import { ProductTypes } from "@/types";

interface CategoyPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage = async ({ params }: CategoyPageProps) => {
  const products = await getProductsFormCategoryId(params.categoryId) as ProductTypes[];
  return (
    <div className="h-full">
      <CategoryProducts products={products} />
    </div>
  );
};

export default CategoryPage;
