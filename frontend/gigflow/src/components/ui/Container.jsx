const Container = ({ children, className = "" }) => (
  <div className={`max-w-[1600px] mx-auto border-x-4 border-black ${className}`}>
    {children}
  </div>
);

export default Container;

