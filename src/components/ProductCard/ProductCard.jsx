import { Link } from "react-router";
import { cn } from "../../lib/utils";
import { memo } from "react";

function ProductCard({ product }) {
  return (
    <div className={cn("relative group text-[#222] dark:text-white")}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <Link to={`/productdetails/${product.id}`}>
          <div className="img-box rounded-md overflow-hidden">
            <img
              className="h-64 w-full object-contain group-hover:scale-105 transition-transform duration-300"
              src={product.image}
              alt={product.title}
              loading="lazy"
            />
          </div>

          <div className="py-3 px-2 text-center">
            <h3 className="text-lg font-semibold truncate">
              {product.title}
            </h3>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-700 dark:text-gray-300">
              <p className="font-bold">{product.price} $</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default memo(ProductCard);
