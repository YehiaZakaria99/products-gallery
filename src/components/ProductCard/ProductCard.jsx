import { Link } from "react-router";
import { cn } from "../../lib/utils";
import { memo } from "react";
import { StarIcon, StarHalfIcon } from "@phosphor-icons/react";

function ProductCard({ product }) {
  const rating = product.rating?.rate ?? 4.0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className={cn(
        "relative group rounded-xl overflow-hidden bg-card shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
      )}
    >
      <Link to={`/productdetails/${product.id}`}>
        {/* Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-64 w-full object-contain bg-gray-50 p-4 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-main text-textColor text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          <h3 className="text-base font-semibold text-textColor line-clamp-2 min-h-[48px]">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex justify-center items-center mt-2 gap-1">
            {/* Full stars */}
            {Array.from({ length: fullStars }).map((_, i) => (
              <StarIcon
                key={`full-${i}`}
                size={16}
                weight="fill"
                className="text-main"
              />
            ))}

            {/* Half star */}
            {hasHalfStar && (
              <StarHalfIcon size={16} weight="fill" className="text-main" />
            )}

            {/* Empty stars */}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <StarIcon
                key={`empty-${i}`}
                size={16}
                weight="regular"
                className="text-gray-300 dark:text-gray-600"
              />
            ))}

            <span className="text-sm text-textColor/70 dark:text-gray-300 ml-1">
              {rating.toFixed(1)}
            </span>
          </div>

          {/* Price */}
          <p className="mt-2 text-lg font-bold text-green-600 dark:text-green-400">
            ${product.price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default memo(ProductCard);
