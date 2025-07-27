import { Link, useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading/Loading";

export default function ProductDetails() {
  const { id } = useParams();

  const getProduct = async () => {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return data;
  };

  const {
    data: product = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: getProduct,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || isFetching) return <Loading />;

  return (
    <section className="productDetails py-40 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-card shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/3 flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-xs rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Content */}
          <div className="md:w-2/3 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-textColor">
                {product.title}
              </h2>
              <p className="text-textColor/75 text-sm leading-relaxed">
                {product.description}
              </p>
              <p className="text-sm text-textColor/65 capitalize">
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>

              <div className="flex justify-between items-center border-t pt-4">
                <p className="text-xl font-bold text-green-600">
                  ${product.price}
                </p>
                <div className="flex items-center gap-1">
                  <i className="fas fa-star text-yellow-400"></i>
                  <span className="text-textColor/65">
                    {product.rating?.rate}
                  </span>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6">
              <Link
                to="/products"
                className="block text-center bg-main/90 hover:bg-main text-textColor font-semibold py-3 rounded-lg transition-colors duration-300"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
