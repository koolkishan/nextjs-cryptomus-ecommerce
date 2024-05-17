"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import useDebounce from "@/hooks/useDebounce";
import { getAllTagsAction } from "@/actions/get-all-tags-action";

const Search = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [allTags, setAllTags] = useState<string[] | []>([]);
  const [tagsSuggetion, setTagSuggetion] = useState<string[] | []>([]);
  const [searchTerm, setsearchTerm] = useState<string>("");
  const [showSearchContainer, setShowSearchContainer] = useState(true);
  const debounceSearchTerm = useDebounce(searchTerm, 300);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        inputRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSearchContainer(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchContainerRef]);

  useEffect(() => {
    async function getAllTagsFromDb() {
      const response = await getAllTagsAction();
      if (response) {
        setAllTags(response);
      }
    }
    getAllTagsFromDb();
  }, []);

  useEffect(() => {
    if (debounceSearchTerm) {
      setTagSuggetion(
        allTags.filter((t) =>
          t.toLowerCase().includes(debounceSearchTerm.toLowerCase())
        )
      );
    }
    if (debounceSearchTerm?.length === 0) setTagSuggetion([]);
  }, [allTags, debounceSearchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < tagsSuggetion.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selectedTag = tagsSuggetion[selectedIndex];
      router.push(`/search/${encodeURIComponent(selectedTag)}`);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <Input
          ref={inputRef}
          onChange={(e) => setsearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border-black/20 outline-none bg-transparent text-zinc-600  placeholder:text-primary-gray "
          placeholder="Search..."
          value={searchTerm}
          onFocus={() => setShowSearchContainer(true)}
        />
        <IoSearchOutline
          size={40}
          className="text-primary-text bg-secondary-blue p-2 rounded-r-lg ml-[-3px] cursor-pointer "
        />
      </div>
      {showSearchContainer ? (
        <div
          ref={searchContainerRef}
          className="absolute  max-h-80 overflow-auto w-full bg-secondary-white shadow-2xl rounded-b-xl"
        >
          {tagsSuggetion.map((t, index) => (
            <p
              className={`px-3 py-2 hover:bg-blue-100 ${
                index === selectedIndex ? "bg-blue-100" : ""
              }`}
              key={index}
              onClick={() => {
                router.push(`/search/${encodeURIComponent(t)}`);
              }}
            >
              {t}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
