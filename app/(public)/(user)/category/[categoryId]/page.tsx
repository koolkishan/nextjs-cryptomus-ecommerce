import { CategoryProducts } from "@/components/user";
import { getProductsFormCategoryId } from "@/data/product";

interface CategoyPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage = async ({ params }: CategoyPageProps) => {
  const products = await getProductsFormCategoryId(params.categoryId);
  return (
    <div className="h-full">
      <CategoryProducts products={products} />
    </div>
  );
};

export default CategoryPage;
