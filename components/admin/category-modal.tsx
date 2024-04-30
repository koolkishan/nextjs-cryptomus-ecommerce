import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryTypes, CategoryWithProductCount } from "@/types";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { updateCategory } from "@/actions/update-category";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { getCategories } from "@/actions/get-all-categories";
import { useAppStore } from "@/store";
import { getAllCategorisWithProductCount } from "@/actions/get-all-categories-with-product-count";
import { toast } from "sonner";

interface CategoryModalProps {
  setsetCategoryModal: Dispatch<SetStateAction<boolean>>;
  categoryModal: boolean;
}

export const CategoryModal = ({
  setsetCategoryModal,
  categoryModal,
}: CategoryModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { setCategoriesData, viewingCategoryId } = useAppStore();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function getCategoriesProduct() {
      const result = await getAllCategorisWithProductCount();
      const categoryDetails = result.find((c) => c.id === viewingCategoryId);
      if (categoryDetails) {
        categoryDetails;
        setNewCategoryName(categoryDetails?.categoryName);
      }
    }
    getCategoriesProduct();
  }, [viewingCategoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  const handleSave = async () => {
    const { error, success } = await updateCategory(
      newCategoryName,
      viewingCategoryId
    );
    if (error) {
      toast.error("Please provide a unique category name.");
      setsetCategoryModal(false);
    }
    if (success) {
      toast.success("Category updated successfully");
      setsetCategoryModal(false);
    }
    const response = await getCategories();
    if (response && response.length) {
      setCategoriesData(response);
    }
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div className="z-50">
      <Dialog open={categoryModal} onOpenChange={setsetCategoryModal}>
        <DialogContent className="bg-surface border border-secondary-black">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary-text">
              Edit Category
            </DialogTitle>
            <DialogDescription className="text-white">
              <div className="mt-3">
                <p className="text-custom-font">Category Name</p>
                <Input
                  type="text"
                  className="mb-5 mt-2 bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                  value={newCategoryName}
                  onChange={handleChange}
                />
              </div>
              <div className="my-4">
                <FormError message={error} />
              </div>
              <div className="my-4">
                <FormSuccess message={success} />
              </div>
              <div>
                <Button
                  size={"sm"}
                  onClick={handleSave}
                  className="w-1/4 bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
                >
                  Save
                </Button>
                <Button
                  size={"sm"}
                  onClick={() => setsetCategoryModal(false)}
                  className="w-1/4 bg-transparent border border-secondary-black hover:bg-transparent rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryModal;
