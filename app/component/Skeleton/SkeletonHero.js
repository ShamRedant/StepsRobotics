export default function SkeletonHero() {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gray-100">

      {/* Background Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between">

        {/* LEFT SIDE – TEXT PLACEHOLDERS */}
        <div className="flex-1 space-y-6 mt-10 md:mt-0">
          {/* Title 1 */}
          <div className="h-10 w-2/3 bg-gray-300 rounded-md animate-pulse" />
          {/* Title 2 */}
          <div className="h-10 w-1/2 bg-gray-300 rounded-md animate-pulse" />

          {/* Paragraph lines */}
          <div className="h-5 w-4/5 bg-gray-300 rounded-md animate-pulse" />
          <div className="h-5 w-3/5 bg-gray-300 rounded-md animate-pulse" />

          {/* Button */}
          <div className="h-12 w-44 bg-gray-300 rounded-full animate-pulse" />
        </div>

        {/* RIGHT SIDE – IMAGE PLACEHOLDER */}
        <div className="hidden md:flex w-[450px] h-[450px] bg-gray-300 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
