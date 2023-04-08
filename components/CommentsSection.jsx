import { useEffect, useState } from "react";
import { db } from "@/firebase-config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { blogid } = router.query;

  useEffect(() => {
    const commentsRef = collection(db, "Blogs", blogid, "Comments");
    const commentsQuery = query(commentsRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [blogid]);

  return (
    <div className="bg-warm-gray-50 rounded-lg shadow-lg p-6 mx-auto md:px-2 py-4 w-1/2">
      <h2 className="text-3xl  text-center font-bold mb-6">
        Comments ({comments.length})
      </h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mb-6 mx-2">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-gray-500">
                  {comment.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{comment.name}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(comment.timestamp.toDate()).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-lg">{comment.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600 m-2">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentSection;
