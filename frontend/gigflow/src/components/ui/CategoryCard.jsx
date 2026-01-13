const CategoryCard = ({ category }) => (
  <div className="bg-white border-2 border-black rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer">
    <div
      className={`w-12 h-12 ${category.color} border-2 border-black rounded-full flex items-center justify-center mb-1`}
    >
      <category.icon className="w-6 h-6 text-black" />
    </div>
    <div className="font-black text-sm uppercase">{category.name}</div>
    <div className="text-xs font-bold text-gray-500">{category.count} Gigs</div>
  </div>
);

export default CategoryCard;

