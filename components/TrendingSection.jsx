import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2700,
};

const TrendingSection = ({ trendingBlogs }) => {
  return (
    <div className="py-16">
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-5xl pb-12 text-center">Trending</h1>

        <Slider {...settings}>
          {trendingBlogs.map((blog) => (
            <Slide key={blog.id} blog={blog} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendingSection;

function Slide({ blog }) {
  return (
    <div className="grid md:flex md:flex-col lg:flex-row sm:px-6 lg:px-2 md:px-6">
      <div className="image">
        <Link href={`/blogs/${blog.id}`} legacyBehavior>
          <a>
            <img
              src={blog.imageUrl}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              className="px-10"
            />
          </a>
        </Link>
      </div>

      <div className="info flex justify-center flex-col mx-6 lg:mx-0">
        <div className="cat">
          <Link
            href={`/categories/${blog.category.toLowerCase()}`}
            legacyBehavior
          >
            <a className="text-orange-600 hover:text-orange-800 mr-2 my-6">
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
            <a className="lg:text-6xl md:text-5xl sm:text-2xl font-bold text-black hover:text-gray-700">
              {blog.title}
            </a>
          </Link>
        </div>
        <Link href={`/blogs/${blog.id}`} legacyBehavior>
          <p className="text-gray-500 py-3 lg:text-2xl md:text-xl sm:text-lg cursor-pointer">
            {blog.excerpt}
          </p>
        </Link>
        <h1 className="font-semibold lg:text-xl md:text-lg sm:text-md">
          {blog.author}
        </h1>
      </div>
      <style jsx>{`
        @media (min-width: 1024px) {
          .image img {
            min-width: 600px;
            max-width: 600px;
            min-height: 600px;
            max-height: 600px;
          }
        }
      `}</style>
    </div>
  );
}
