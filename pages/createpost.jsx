import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase-config";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreatePost({ user }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && excerpt && imageUrl && content) {
      try {
        await addDoc(collection(db, "Blogs"), {
          title,
          excerpt,
          isTrending,
          imageUrl,
          category,
          content,
          author: user.displayName,
          userId: user.uid,
          timestamp: serverTimestamp(),
        });
        toast.success("Blog post created successfully!");
        setSubmitted(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (err) {
        console.log(err);
        toast.error(`${err.message}`);
      }
    } else {
      toast.error("All fields are mandatory.");
    }
  };

  return (
    <>
      {user ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 mt-28">
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            theme="colored"
            className="my-28 ml-16"
          />
          <div className="w-screen max-w-4xl p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Create a Blog
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-semibold mb-2 text-lg"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-400 p-4 rounded-md focus:outline-none focus:border-[#1967d2] focus:border-2 text-lg"
                  placeholder="Enter a title for your post"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="excerpt"
                  className="block text-gray-700 font-semibold mb-2 text-lg"
                >
                  Excerpt:
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full border border-gray-400 p-4 rounded-md focus:outline-none focus:border-[#1967d2] focus:border-2 text-lg"
                  placeholder="Enter an excerpt for your post"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="image">
                  Image URL:
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  id="image"
                  value={imageUrl}
                  placeholder="Enter the image URL"
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="trending">
                  Trending? :
                </label>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="trending"
                      value="true"
                      checked={isTrending === true}
                      onChange={(e) => setIsTrending(true)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="trending"
                      value="false"
                      checked={isTrending === false}
                      onChange={(e) => setIsTrending(false)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="tags">
                  Category:
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="border border-gray-400 p-2 rounded-lg w-full"
                >
                  <option value="">--Select a category--</option>
                  <option value="technology">Technology</option>
                  <option value="food">Health</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
              <div className="mb-16">
                <label
                  htmlFor="content"
                  className="block text-gray-700 font-semibold mb-2 text-lg"
                >
                  Content:
                </label>
                <ReactQuill
                  id="content"
                  theme="snow"
                  value={content}
                  onChange={(value) => setContent(value)}
                  style={{ height: "400px" }}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                />
              </div>
              <button
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                type="submit"
              >
                Publish Blog
              </button>
            </form>
          </div>
          {/* )} */}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 mt-20">
          <div className="bg-black rounded-lg px-10 py-9 pt-6">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Create a Blog
            </h2>
            <p className="text-gray-400 mb-8">
              You need to be logged in to create a post.
            </p>
            <Link href="/login" legacyBehavior>
              <a className="bg-blue-600 text-lg text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300">
                Log in
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
