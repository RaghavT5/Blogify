import React from "react";
import { db } from "@/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import CommentsSection from "@/components/CommentsSection";
import CommentForm from "../../components/CommentForm";
import Link from "next/link";

const BlogPage = ({
  title,
  imageUrl,
  category,
  content,
  author,
  timestamp,
}) => {
  return (
    <div>
      <div className="container my-8 mx-auto md:px-2 py-16 w-1/2">
        <div className="post py-10">
          <div className="font-bold text-4xl text-center pb-2">{title}</div>
          <div className="font-medium text-center text-xl flex flex-col pb-2">
            <Link href={""} legacyBehavior>
              <a className="text-orange-600 hover:text-orange-800">
                {category}
              </a>
            </Link>
          </div>
          <div className="font-medium text-center text-xl flex flex-col">
            Published on {new Date(timestamp).toDateString()} by {author}
          </div>
          <div className="image py-5 ">
            <img src={imageUrl} width={900} height={600} />
          </div>
          <div
            className="content text-gray-600 text-2xl flex flex-col gap-4"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
      <div>
        <CommentsSection />
        <CommentForm />
      </div>
    </div>
  );
};

export default BlogPage;

export async function getServerSideProps({ params: { blogid } }) {
  try {
    const docRef = doc(db, "Blogs", blogid);
    const blogDetails = await getDoc(docRef);
    return {
      props: {
        ...blogDetails.data(),
        timestamp: blogDetails.data().timestamp.toMillis(),
      },
    };
  } catch (error) {
    console.log(error);
  }
}
