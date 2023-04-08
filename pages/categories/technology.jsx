import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";
import Link from "next/link";

const technology = ({ technologyBlogs }) => {
  return (
    <div className="max-w-1640 mx-10 item-center justify-center">
      <div className="text-orange-600 hover:text-orange-800 mt-32 mb-10 text-7xl font-semibold text-center">
        Technology
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {technologyBlogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`} legacyBehavior>
            <a className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div
                className="h-56 sm:h-64 md:h-72 lg:h-80 2xl:h-96 bg-cover bg-center"
                style={{ backgroundImage: `url(${blog.imageUrl})` }}
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600">{blog.excerpt}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default technology;

export async function getServerSideProps(context) {
  const technologyBlogsQuery = query(
    collection(db, "Blogs"),
    where("category", "==", "Technology")
  );
  const querySnapshot = await getDocs(technologyBlogsQuery);

  const technologyBlogs = querySnapshot.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      timestamp: docSnap.data().timestamp.toMillis(),
      id: docSnap.id,
    };
  });

  console.log(technologyBlogs);

  return {
    props: { technologyBlogs }, // will be passed to the page component as props
  };
}
