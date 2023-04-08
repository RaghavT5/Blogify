import { useState } from "react";
import { db, auth } from "@/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentForm = () => {
  const [comment, setComment] = useState("");

  const router = useRouter();
  const { blogid } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("You need to be logged in to comment.");
        return;
      }

      if (!comment) {
        toast.warning("Comment can't be empty.");
        return;
      }

      if (!user.displayName) {
        toast.error("Your user display name is not set.");
        return;
      }

      const docRef = await addDoc(collection(db, "Blogs", blogid, "Comments"), {
        name: user.displayName,
        comment: comment,
        timestamp: new Date(),
      });

      // Clear the comment textarea after the comment is successfully added
      setComment("");

      toast.success("Comment added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container my-8 mx-auto md:px-2 py-4 w-1/2 "
    >
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        theme="colored"
        className="my-20"
      />
      <div className="grid grid-cols-1 gap-6">
        <div>
          <textarea
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="5"
            className="block w-full mt-1 border-blue-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-md p-4 bg-gray-50"
            placeholder="Please leave a comment..."
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onSubmit={() => {
              handleSubmit;
            }}
          >
            Submit Comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
