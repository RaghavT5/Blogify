import { useState } from "react";
import { useRouter } from "next/router";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/searchresults?q=${searchTerm}`);
  };

  return (
    <div className="mt-32 flex justify-center items-start">
      <form onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 py-2 px-4 mr-2 focus:outline-none focus:border-blue-500 lg:w-[36rem] md:w-96 rounded-xl"
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
