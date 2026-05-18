const GlassCard = ({ children, className = '', style = {} }) => {
  return (
    <div className={`bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl p-8 ${className}`} style={style}>
      {children}
    </div>
  );
};

export default GlassCard;
