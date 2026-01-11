const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 ${className}`}
  >
    {children}
  </div>
);

export default Card;

