import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CategoryTypes } from "@/types";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { updateCategory } from "@/actions/update-category";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { getCategories } from "@/actions/get-all-categories";
import { useAppStore } from "@/store";

interface CategoryModalProps {
    setsetCategoryModal: Dispatch<SetStateAction<boolean>>;
    categoryModal: boolean;
    category: CategoryTypes;
}

export const CategoryModal = ({ category, setsetCategoryModal, categoryModal }: CategoryModalProps) => {
    const [newCategoryName, setNewCategoryName] = useState<string>(category.categoryName);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { setCategoriesData } = useAppStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryName(e.target.value);
    }

    const handleSave = async () => {
        const { error, success } = await updateCategory(newCategoryName, category.id);
        setError(error);
        setSuccess(success);
        const response = await getCategories();
        if (response && response.length) {
            setCategoriesData(response);
        }

    }

    return (
        <Dialog open={categoryModal} onOpenChange={setsetCategoryModal}>
            <DialogContent className="bg-surface border border-secondary-black">
                <DialogHeader>
                    <DialogTitle className="text-xl text-primary-text">Edit Category</DialogTitle>
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
                        <div className="my-4"><FormError message={error} /></div>
                        <div className="my-4"><FormSuccess message={success} /></div>
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
    );
}

export default CategoryModal;
