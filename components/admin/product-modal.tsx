'use client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CategoryTypes, ProductTypes } from "@/types";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { updateCategory } from "@/actions/update-category";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { getCategories } from "@/actions/get-all-categories";
import { useAppStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "../ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import CloudinaryUploadImages from "./cloudinary-upload-images";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CldUploadButton } from "next-cloudinary";
import { updateProduct } from "@/actions/update-product";
import { getProducts } from "@/actions/get-products";

interface ProductModalProps {
	setProductModal: Dispatch<SetStateAction<boolean>>;
	productModal: boolean;
	product: ProductTypes;
}
const ProductModal = ({ productModal, setProductModal, product }: ProductModalProps) => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [productName, setProductName] = useState<string | ''>('');
	const [categoryName, setCategoryName] = useState<string | ''>('');
	const [description, setDescription] = useState<string | ''>('');
	const [categoryId, setCategoryId] = useState<string | ''>('');
	const [tag, setTags] = useState<string | ''>('');
	const [price, setPrice] = useState<number>();
	const [discount, setDiscount] = useState<number>();
	const [images, setImages] = useState<string[] | []>([]);
	console.log('images:', images);
	const [quantity, setQuantity] = useState<number>();
	const [IsDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const { categoriesData, setProductsData } = useAppStore();
	useEffect(() => {
		const category = categoriesData.find((c) => c.id === product.categoryId);
		if (category) {
			setCategoryName(category?.categoryName);
			setCategoryId(category?.id);
		}
		setProductName(product.productName);
		setDiscount(product.discount);
		setDescription(product.description)
		setPrice(product.price)
		if (product.images) setImages([...product.images])
		setQuantity(product.quantity)
		if (product.tags) setTags(product.tags.join(','))
	}, [product, categoriesData])

	const handleUploadSuccess = (uploaded: any) => {
		if (uploaded?.event === "success") {
			setImages((prevImages) => [...prevImages, uploaded.info.url]);
		}
	};
	const removeImage = (imageUrl: string) => {
		setImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
	};

	const handleSave = async () => {
		if (price && discount && quantity) {
			const { success, error } = await updateProduct(product.id, productName, categoryId, description, tag, price, images, discount, quantity)
			setError(error);
			setSuccess(success);
			const response = await getProducts();
			if (response && response.length > 0) {
				setProductsData(response);
				const timerId = setTimeout(() => {
					setError("");
					setSuccess("");
				}, 2000);

				setTimeout(() => {
					clearTimeout(timerId);
				}, 2000);
			}
		}
	}
	return (
		<Dialog open={productModal} onOpenChange={setProductModal}
		>
			<DialogContent className="bg-surface border border-secondary-black">
				<Tabs defaultValue="information" className="w-full">
					<DialogHeader className="w-full mt-4">
						<TabsList className="bg-transparent">
							{["information", "pricing", "images", "inventory"].map((tab) => (
								<TabsTrigger
									key={tab}
									className="data-[state=active]:border-b-2 data-[state=active]:border-b-secondary-blue rounded-none data-[state=active]:text-primary-text data-[state=active]:bg-transparent text-primary-text hover:bg-transparent"
									value={tab}
								>
									{tab.charAt(0).toUpperCase() + tab.slice(1)}
								</TabsTrigger>
							))}
						</TabsList>
					</DialogHeader>

					{["information", "pricing", "images", "inventory"].map((tab) => (
						<TabsContent key={tab} value={tab} className="">
							{tab === "information" && (
								<div className="text-3xl text-primary-text my-4">
									<p>Information</p>
								</div>
							)}
							{tab === "information" && (
								<div className="text-primary-text">
									<div className="mb-4">
										<div className="text-custom-font">Product Name</div>
										<div>
											<Input
												onChange={(e) => setProductName(e.target.value)}
												value={productName}
												className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
												placeholder="Enter product name"
											/>
										</div>
									</div>
									<div className="mb-4">
										<div className="text-custom-font">Description</div>
										<div>
											<Textarea
												onChange={(e) => setDescription(e.target.value)}
												value={description}
												className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
												placeholder="Type something"
											/>
										</div>
									</div>
									<div className="text-custom-font">Category</div>
									<div className="mb-4">
										<Select
											onValueChange={(value) => setCategoryName(value)}
											value={categoryName}
										>
											<SelectTrigger className="bg-transparent outline-none border-secondary-black">
												<SelectValue placeholder="" />
											</SelectTrigger>
											<SelectContent className="font-light text-primary-text hover:bg-surface bg-primary-background outline-none border-secondary-black">
												{categoriesData.map((category) => (
													<SelectItem
														key={category.id}
														className="hover:bg-surface"
														value={category.categoryName}
													>
														{category.categoryName}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div>
										<div className="text-custom-font">Tags</div>
										<div>
											<Input
												onChange={(e) => setTags(e.target.value)}
												value={tag}
												className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
											/>
										</div>
									</div>
								</div>
							)}
							{tab === "pricing" && (
								<div className="text-3xl text-primary-text my-4">
									<p>Pricing</p>
								</div>
							)}
							{tab === "pricing" && (
								<div className="text-primary-text">
									<div className="mb-4">
										<div className="text-custom-font">Price</div>
										<div>
											<Input
												onChange={(e) => setPrice(+e.target.value)}
												value={price}
												className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
												placeholder="Enter price"
												type="number"
												min={1}
											/>
										</div>
									</div>
									<div className="mb-4">
										<div className="text-custom-font">Discount</div>
										<div>
											<Input
												onChange={(e) => setDiscount(+e.target.value)}
												value={discount}
												className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
												placeholder="Enter Discount"
												type="number"
												min={0}
											/>
										</div>
									</div>
								</div>
							)}
							{tab === "inventory" && (
								<div className="text-3xl text-primary-text my-4">
									<p>Inventory</p>
								</div>

							)}
							{tab === "inventory" && (
								<div className="text-primary-text">
									<div className="mb-4">
										<div className="text-custom-font">Quantity</div>
										<div>
											<Input
												onChange={(e) => setQuantity(+e.target.value)}
												value={quantity}
												className="font-light bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
												placeholder="Enter quantity"
												type="number"
												min={0}
											/>
										</div>
									</div>
								</div>
							)}
							{tab === "images" && (
								<div className="text-3xl text-primary-text my-4">
									<p>Images</p>
								</div>
							)}
							{tab === "images" && (
								<div className="text-primary-text">
									<div className="mb-4">
										<div className="border rounded-xl border-dashed border-custom-font h-[100px] flex flex-col justify-center items-center">
											<div className="flex flex-col justify-center items-center" style={{ pointerEvents: 'auto' }}>
												<CldUploadButton
													options={{ multiple: true }}
													uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
													onUpload={handleUploadSuccess}
													onOpen={() => {
														setTimeout(() => (document.body.style.pointerEvents = ""), 0);
														setIsDialogOpen && setIsDialogOpen(true);
													}}
													onClose={() => {
														setTimeout(() => (document.body.style.pointerEvents = "none"), 0);
													}}
												>
													<p>
														<IoCloudUploadOutline size={22} className="text-custom-font" />
													</p>
													<p className="hover:underline">
														Brows to <span className="text-blue-700 underline">upload</span> images
													</p>
												</CldUploadButton>
											</div>

										</div>
									</div>
									<div className="grid grid-cols-3 gap-3 mb-4">
										{images.length > 0 &&
											images.map((imageUrl, index) => (
												<div key={index} className="relative">
													<Image src={imageUrl} alt="image" width={90} height={90} />
													<div className="absolute top-0 right-2" onClick={() => removeImage(imageUrl)}>
														<RxCrossCircled size={18} color="red" />
													</div>
												</div>
											))}
									</div>
								</div>
							)}
						</TabsContent>
					))}

					<div className="my-4">
						<FormError message={error} />
					</div>
					<div className="my-4">
						<FormSuccess message={success} />
					</div>
					<div>
						<Button
							onClick={handleSave}
							size={"sm"}
							className="w-1/4 bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
						>
							Save
						</Button>
						<Button
							size={"sm"}
							onClick={() => setProductModal(false)}
							className="w-1/4 bg-transparent border border-secondary-black hover:bg-transparent rounded-xl"
						>
							Cancel
						</Button>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>

	);
}

export default ProductModal;
