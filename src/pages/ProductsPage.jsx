import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import Loading from "../components/Loading/Loading";
import ProductCard from "../components/ProductCard/ProductCard";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fetchProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
  };

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["AllProducts"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  // Search
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allProducts, searchQuery]);

  // Sort
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

  if (isLoading) return <Loading />;

  return (
    <section className="products py-36">
      <div className="container">
        <div className="box py-6 md:w-4/5 w-full mx-auto">
          {/* Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <input
              onInput={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="outline-none shadow-[0_0px_3px_rgba(0,0,0,0.25)] focus:shadow-main px-3 py-2 block w-full md:w-1/2 rounded-md text-lg"
              type="text"
              placeholder="Search products..."
            />

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:border-main focus:ring focus:ring-main"
            >
              <option value="">Sort by...</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
              <option value="nameAZ">Name: A → Z</option>
            </select>
          </div>

          {/* Products */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
