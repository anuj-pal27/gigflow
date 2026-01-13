const FreelancerCard = ({ freelancer }) => (
  <div className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
    <div
      className={`w-16 h-16 ${freelancer.color} border-2 border-black rounded-full flex items-center justify-center`}
    >
      <span className="font-black text-xl">{freelancer.name.charAt(0)}</span>
    </div>
    <div>
      <div className="font-black text-lg">{freelancer.name}</div>
      <div className="text-sm font-bold text-gray-500 uppercase">
        {freelancer.role}
      </div>
      <div className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded mt-1 inline-block">
        {freelancer.rate}
      </div>
    </div>
  </div>
);

export default FreelancerCard;

