import { Star, Heart } from "lucide-react";

const GigCard = ({ gig }) => (
  <div className="bg-white border-2 border-black rounded-xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 cursor-pointer flex flex-col h-full">
    {/* Image Placeholder */}
    <div
      className={`h-40 ${gig.imageColor} border-b-2 border-black flex items-center justify-center relative`}
    >
      <span className="font-black text-4xl opacity-20 uppercase tracking-widest">
        <img src="./public/Webdev.png" alt="Web Development" />
      </span>
      {gig.tag && (
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-black border border-black rounded ${gig.tagColor} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
        >
          {gig.tag}
        </span>
      )}
      <Heart className="absolute top-2 right-2 w-6 h-6 text-white stroke-black stroke-2 hover:fill-red-500 transition-colors" />
    </div>

    <div className="p-4 flex flex-col flex-1">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-black border border-black"></div>
        <span className="text-xs font-bold text-gray-600 hover:underline">
          {gig.seller}
        </span>
      </div>
      <h4 className="font-bold leading-tight mb-3 line-clamp-2 flex-1">
        {gig.title}
      </h4>
      <div className="flex justify-between items-center border-t-2 border-gray-100 pt-3 mt-auto">
        <div className="flex items-center gap-1 text-xs font-bold">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 stroke-black" />{" "}
          {gig.rating}{" "}
          <span className="text-gray-400">({gig.reviews})</span>
        </div>
        <div className="font-black text-lg">From ${gig.price}</div>
      </div>
    </div>
  </div>
);

export default GigCard;

