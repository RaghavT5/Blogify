import React from "react";
import Link from "next/link";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "@/firebase-config";
import { useRouter } from "next/router";

const LatestPostsSection = ({ allBlogs }) => {
  return (
    <div className="container mx-auto md:px-20 py-10">
      <div className="font-bold text-4xl py-12 text-center">Latest Posts</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14 ">
        {Post(allBlogs)}
      </div>
    </div>
  );
};

export default LatestPostsSection;

function Post(allBlogs) {
  const userId = auth.currentUser?.uid;

  const handleDelete = async (blogid) => {
    if (
      window.confirm(
        "Are you sure you want to delete the blog? This action is permanent"
      )
    ) {
      try {
        await deleteDoc(doc(db, "Blogs", blogid));
        toast.success("Blog deleted successfully!");
        location.reload();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const router = useRouter();
  const handleEdit = (blogid) => {
    router.push(`/editpost?q=${blogid}`);
  };

  // const userId = user?.uid;
  // console.log("userId:", userId);
  return (
    <>
      {allBlogs.map((blog) => {
        {
          /* console.log(blog.userId); */
        }
        return (
          <div className="item" key={blog.id}>
            <ToastContainer
              position="top-center"
              hideProgressBar={true}
              theme="colored"
              className="my-20"
            />
            <div className="image">
              <Link href={`/blogs/${blog.id}`} legacyBehavior>
                <a>
                  <img
                    src={blog.imageUrl}
                    alt="/"
                    className="rounded sm:mx-3 lg:mx-0"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </a>
              </Link>
            </div>
            <div className="info flex justify-center flex-col py-4 sm:mx-3">
              <div className="cat">
                <Link href={`/categories/${blog.category}`} legacyBehavior>
                  <a className="text-orange-600 hover:text-orange-800 mr-2">
                    {blog.category}
                  </a>
                </Link>
                <Link href={`/blogs/${blog.id}`} legacyBehavior>
                  <a className="text-gray-800 hover:text-gray-600 ">
                    {new Date(blog.timestamp).toDateString()}
                  </a>
                </Link>
              </div>
              <div className="title">
                <Link href={`/blogs/${blog.id}`} legacyBehavior>
                  <a className="text-2xl  font-bold text-black hover:text-gray-700">
                    {blog.title}
                  </a>
                </Link>
              </div>
              <p className="text-gray-500 py-3">{blog.excerpt}</p>
              <div className="flex flex-row">
                <h1 className="text-lg">{blog.author}</h1>
                {userId === blog.userId && (
                  <div className="flex flex-row ml-64">
                    <MdDeleteForever
                      size={25}
                      className="hover:scale-150 duration-300"
                      onClick={() => handleDelete(blog.id)}
                    />
                    <RiEdit2Fill
                      size={25}
                      className="hover:scale-150 duration-300"
                      onClick={() => handleEdit(blog.id)}
                    />
                    {/* <Link href={`/editpost/${blog.id}`}>
                      <RiEdit2Fill
                        size={25}
                        className="hover:scale-150 duration-300"
                      />
                    </Link> */}
                  </div>
                )}
              </div>
            </div>

            <style jsx>{`
              @media (min-width: 1024px) {
                .image img {
                  min-width: 400px;
                  max-width: 400px;
                  min-height: 400px;
                  max-height: 400px;
                }
              }
            `}</style>
          </div>
        );
      })}
    </>
  );
}
