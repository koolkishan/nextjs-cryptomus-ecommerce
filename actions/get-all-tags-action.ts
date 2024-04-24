"use server";

import { getAllTags } from "@/data/product";

export const getAllTagsAction = async () => {
  try {
    const tags = await getAllTags();
    return tags;
  } catch (error) {
    console.log("Error while getting all tags", error);
  }
};
