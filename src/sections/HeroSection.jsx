import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import { Link } from "react-router";
import { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fetchProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
  };

  const {
    data: allProducts,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["HeroProducts"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) return <Loading />;

  return (
    <section className="relative  w-full flex flex-col items-center justify-center bg-background px-4 py-36">
      <h1 className="text-4xl md:text-5xl font-bold  mb-8 text-textColor">
        Products Gallery
      </h1>

      <div className="w-full max-w-4xl">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="py-6"
        >
          {allProducts?.slice(0, 6).map((product) => (
            <SwiperSlide key={product.id} className="py-10">
              <div className="bg-card shadow-md shadow-main rounded-lg overflow-hidden hover:shadow-lg transition">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full aspect-[4/3] object-contain bg-gray-50 p-4"
                />
                <div className="p-3 text-center">
                  <h3 className="text-base font-medium text-textColor line-clamp-2 truncate">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-green-600 font-semibold">
                    ${product.price}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link
        to={"/products"}
        className="mt-8 px-6 py-2 bg-main/90 hover:bg-main text-textColor rounded-md text-lg flex items-center gap-2 transition font-semibold cursor-pointer duration-300"
      >
        See More
      </Link>
    </section>
  );
}
