import { ScaleLoader } from "react-spinners";
import { cn } from "../../lib/utils";

export default function Loading() {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 flex justify-center items-center",
          "bg-white",
          "dark:bg-[#222]"
        )}
      >
        <ScaleLoader color="red" />
      </div>
    </>
  );
}
