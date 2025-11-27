// SkeletonHero.jsx
export default function SkeletonHero() {
  return (
    <section className="relative container-spacing banner_h h-[600px] md:h-[550px] bg-gray-100 animate-pulse">
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gray-200"></div>

      {/* Content skeleton */}
      <div className="relative z-10 mx-auto container-custom px-4 h-full flex flex-col md:flex-row items-center justify-between">
        
        {/* LEFT SIDE - Text Skeleton */}
        <div className="max-w-3xl space-y-4">
          {/* Title skeleton */}
          <div className="h-16 md:h-20 bg-gray-300 rounded-lg w-3/4"></div>
          
          {/* Subtitle skeleton */}
          <div className="h-16 md:h-20 bg-gray-300 rounded-lg w-2/3"></div>
          
          {/* Paragraph skeleton */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-5/6"></div>
          </div>
          
          {/* Button skeleton */}
          <div className="h-14 bg-gray-300 rounded-full w-48"></div>
        </div>

        {/* RIGHT SIDE - Image Skeleton */}
        <div className="relative banner_RTL_image w-[750px] h-[750px] hidden md:block">
          <div className="w-full h-full bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Info Cards Skeleton */}
      <div className="absolute bottom-[-40px] banner_info_sec left-0 right-0 z-20 container-custom rounded-t-3xl">
        <div className="container rounded-t-3xl shadow-[-1px_-14px_10px_rgba(0,0,0,0.12)] mx-auto">
          <div className="bg-white rounded-t-3xl p-2">
            <div className="grid grid-cols-2 md:grid-cols-4 container-custom bg-gradient-to-b from-gray-100 to-white gap-6 rounded-2xl py-4 px-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-center gap-4 p-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}