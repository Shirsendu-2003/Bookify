import { LuSearchX } from "react-icons/lu";

export default function EmptyState({
  title = "No Data Found",
  description = "Nothing available yet.",
}) {
  return (
    <div className="text-center py-12">
      <LuSearchX
        size={52}
        className="mx-auto text-slate-400 mb-4"
      />

      <h3 className="font-bold text-lg">
        {title}
      </h3>

      <p className="text-slate-500 mt-2">
        {description}
      </p>
    </div>
  );
}