import { Link } from "react-router";
import { cn } from "../../lib/utils";
import { memo } from "react";

function ProductCard({ product }) {
  return (
    <div
      className={cn(
        "relative group rounded-xl overflow-hidden bg-card shadow-md hover:shadow-md transition-shadow shadow-main duration-300"
      )}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-64 w-full object-contain bg-gray-50 p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-main text-textColor text-xs font-semibold px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <h3 className="text-base font-semibold text-textColor line-clamp-2 min-h-[48px] truncate">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex justify-center items-center mt-2 gap-1">
          <i className="fas fa-star"></i>
          <span className="text-sm text-textColor/70 dark:text-gray-300">
            {product.rating?.rate ?? "4.0"}
          </span>
        </div>

        {/* Price */}
        <p className="mt-2 text-lg font-bold text-green-600 dark:text-green-400">
          ${product.price}
        </p>
      </div>
      {/* </Link> */}

      {/* Hover Action */}
      <div className="absolute inset-0 bg-main/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <Link
          to={`/productdetails/${product.id}`}
          className="bg-background text-main  px-4 py-2 rounded-md font-semibold shadow-md hover:bg-foreground transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default memo(ProductCard);
