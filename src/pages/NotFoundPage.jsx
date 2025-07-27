import { Link } from "react-router";
import { WarningIcon } from "@phosphor-icons/react";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background text-textColor">
      <div className="text-center px-6">
        <WarningIcon
          size={80}
          weight="fill"
          className="text-main mx-auto mb-6"
        />

        <h1 className="text-6xl font-bold text-main">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-textColor/70 mt-2 max-w-md mx-auto">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-main/90 hover:bg-main text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
