export function DotsSpinner() {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="h-1 w-1 animate-pulse rounded-full bg-zinc-300 duration-700" />
      <div className="h-1 w-1 animate-pulse rounded-full bg-zinc-300 delay-150 duration-700" />
      <div className="h-1 w-1 animate-pulse rounded-full bg-zinc-300 delay-300 duration-700" />
    </div>
  );
}
