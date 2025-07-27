import { ScaleLoader } from "react-spinners";
import { cn } from "../../lib/utils";

export default function Loading() {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 flex justify-center items-center",
          "bg-background",
        )}
      >
        <ScaleLoader color="orangered" />
      </div>
    </>
  );
}
