import LatestPostsSection from "@/components/LatestPostsSection";
import SearchBar from "@/components/SearchBar";
import TrendingSection from "@/components/TrendingSection";
import Head from "next/head";
import { db } from "@/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Footer from "@/components/Footer";

export async function getServerSideProps(context) {
  const querySnapshot = await getDocs(collection(db, "Blogs"));

  const allBlogs = querySnapshot.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      timestamp: docSnap.data().timestamp.toMillis(),
      id: docSnap.id,
    };
  });

  const trendingBlogsQuery = query(
    collection(db, "Blogs"),
    where("isTrending", "==", true)
  );
  const querySnapshot2 = await getDocs(trendingBlogsQuery);

  const trendingBlogs = querySnapshot2.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      timestamp: docSnap.data().timestamp.toMillis(),
      id: docSnap.id,
    };
  });

  return {
    props: { allBlogs, trendingBlogs }, // will be passed to the page component as props
  };
}

export default function Home({ allBlogs, trendingBlogs }) {
  return (
    <>
      <Head>
        <title>Blogify</title>
        <meta name="description" content="Blog App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar />
      <TrendingSection trendingBlogs={trendingBlogs} />
      <LatestPostsSection allBlogs={allBlogs} />
      <Footer />
    </>
  );
}
