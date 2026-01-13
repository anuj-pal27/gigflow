const FeatureCard = ({ feature }) => (
  <div
    className={`p-6 border-2 border-black rounded-xl ${feature.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
  >
    <feature.icon className="w-8 h-8 mb-3 text-black" />
    <h4 className="font-black text-lg uppercase mb-1">{feature.title}</h4>
    <p className="text-sm font-medium leading-tight">{feature.text}</p>
  </div>
);

export default FeatureCard;

