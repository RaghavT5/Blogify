import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";
// import BlogCard from "@/components/BlogCard";

const SearchResults = ({ blogs }) => {
  return (
    <div>
      <div className="lg:text-5xl md:text-4xl sm:text-2xl font-bold text-black hover:text-gray-700 mt-32 text-center">
        Search Results
        {/* </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))} */}
      </div>
    </div>
  );
};

export default SearchResults;

export async function getServerSideProps(context) {
  const { q } = context.query;

  const blogsRef = collection(db, "Blogs");
  const blogsQuery = query(blogsRef, where("title", "array-contains", q));
  const blogDocs = await getDocs(blogsQuery);
  const blogs = blogDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toMillis(),
  }));

  console.log(blogs);

  return {
    props: {
      blogs,
    },
  };
}
