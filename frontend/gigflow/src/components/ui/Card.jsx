const Card = ({ children, className = "", noShadow = false }) => (
  <div
    className={`bg-white border-2 border-black rounded-2xl overflow-hidden ${
      noShadow ? "" : "brutal-shadow"
    } ${className}`}
  >
    {children}
  </div>
);

export default Card;
