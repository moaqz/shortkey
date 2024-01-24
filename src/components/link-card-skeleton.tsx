export default function LinkCardSkeleton() {
  return (
    <li className="flex flex-col gap-y-2 rounded-md bg-zinc-800 p-3 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="h-6 w-20 rounded-md bg-zinc-700" />
        <div className="inline-flex gap-x-1">
          <div className="h-6 w-10 rounded-md bg-zinc-700" />
          <div className="h-6 w-10 rounded-md bg-zinc-700" />
          <div className="h-6 w-10 rounded-md bg-zinc-700" />
        </div>
      </div>
      <div className="h-4 w-60 rounded-md bg-zinc-700 sm:w-80" />
    </li>
  );
}
