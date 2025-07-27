import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import Loading from "../components/Loading/Loading";
import ProductCard from "../components/ProductCard/ProductCard";
import { cn } from "../lib/utils";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fetchProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
  };

  const {
    data: allProducts,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["AllProducts"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];
    return allProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allProducts, searchQuery]);

  const sortedProducts = useMemo(() => {
    let products = [...filteredProducts];
    if (sortOption === "priceLowHigh") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAZ") {
      products.sort((a, b) => a.title.localeCompare(b.title));
    }
    return products;
  }, [filteredProducts, sortOption]);

  if (isLoading || isFetching) return <Loading />;

  return (
    <section className="products py-40 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-10 text-main">
          Our Products
        </h1>

        {/* Search & Sort */}
        <div className="bg-background  rounded-md p-6 mb-10 ">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className={cn(
                "border placeholder:text-textColor text-textColor border-main  outline-0 px-4 py-2 w-full md:w-1/2 rounded-lg text-lg shadow-sm ",
                "transition-all focus:border-main focus:ring focus:ring-main duration-300"
              )}
              type="text"
              placeholder="Search products..."
            />

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={cn(
                "border bg-background text-textColor outline-0 border-main  px-4 py-2 rounded-lg shadow-sm text-lg ",
                "transition-all focus:border-main focus:ring focus:ring-main duration-300"
              )}
            >
              <option value="">Sort by...</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
              <option value="nameAZ">Name: A → Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:px-14">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-20">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
