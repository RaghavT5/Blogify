import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditPost = () => {
  const router = useRouter();
  const { q } = router.query;
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "Blogs", q);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
        setTitle(docSnap.data().title);
        setCategory(docSnap.data().category);
        setExcerpt(docSnap.data().excerpt);
        setImageUrl(docSnap.data().imageUrl);
        setContent(docSnap.data().content);
      } else {
        console.log("No such document!");
      }
    }

    fetchData();
  }, [q]);

  const handleCategoryChange = (e) => {
    if (typeof category !== "undefined") {
      setCategory(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "Blogs", q);
    await updateDoc(docRef, {
      title: title,
      category: category,
      imageUrl: imageUrl,
      content: content,
      excerpt: excerpt,
    });
    toast.success("Blog updated successfully!");
    setTimeout(() => {
      router.push(`/blogs/${q}`);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 mt-28">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        theme="colored"
        className="my-28 ml-16"
      />
      <div className="w-screen max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit the Blog</h2>
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
              required
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
              required
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
              required
            />
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
              required
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
              required
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
            Update the Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
