import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SearchResults = ({ blogs }) => {
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    async function fetchData() {
      const blogsRef = collection(db, "Blogs");
      const blogsQuery = query(blogsRef, where("title", "array-contains", q));
      const blogDocs = await getDocs(blogsQuery);

      if (!blogDocs.empty) {
        console.log(blogDocs.docs.map((doc) => doc.data()));
      } else {
        console.log("No matching documents found!");
      }
    }

    fetchData();
  }, [q]);

  return (
    <div>
      <div className="lg:text-5xl md:text-4xl sm:text-2xl font-bold text-black hover:text-gray-700 mt-32 text-center">
        Search Results
      </div>
    </div>
  );
};

export default SearchResults;
