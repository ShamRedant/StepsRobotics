import { Play } from "lucide-react";
import Image from "next/image";

export default function ProjectCard({ image, name, onClick }) {
  return (

    // <div
    //   onClick={onClick}
    //   className="relative group rounded-2xl flex flex-col justify-between border-2 custom-dashed-border border-black-300 transition-all duration-300 overflow-hidden bg-white p-3 hover:bg-yellow-50 cursor-pointer"
    // >
    <div
      onClick={onClick}
      className="relative group rounded-2xl h-full border-2 custom-dashed-border border-black-300 transition-all duration-300 overflow-hidden bg-white p-3 hover:bg-yellow-50 cursor-pointer"
    >

      <Image
        src={image || "/Swetha.png"}
        alt={name}
        className="w-full h-64 object-cover rounded-2xl"
        width={300}
        height={200}
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
        <button
          className="bg-white p-4 rounded-full shadow-lg group-hover:opacity-100 transition"
          onClick={onClick}
        >
          <Play className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="text-center childerns_name pt-3">
        <p className="text-lg">
          STEPS Robotics Project – {name}
        </p>
      </div>
    </div>

  );
}
