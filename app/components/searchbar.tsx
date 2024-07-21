"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function Searchbar() {
  const [search, setSearch] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);

    setSearch(term);
    console.log(search);
  }, 300);

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="border w-11/12 rounded border-neutral-200 bg-neutral-50 px-3 py-1.5 dark:border-neutral-700 dark:bg-neutral-800"
        placeholder="Search My Blogs"
        defaultValue={searchParams.get("query")?.toString()}
        // value={search}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      {/* <button
        type="submit"
        className="justify-center w-1/5 border cursor-pointer border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100"
        // disabled={isLoading}
        
      >
        Search
      </button> */}
    </div>
  );
}

export default Searchbar;