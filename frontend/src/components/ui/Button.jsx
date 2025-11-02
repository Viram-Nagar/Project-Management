function Button({ children, onClick, width, height, text }) {
  return (
    <button
      className={`border-2 border-amber-600 hover:border-amber-400 p-1 rounded-lg bg-amber-600 hover:bg-amber-400   hover:outline-3 hover:outline-amber-400 hover:outline-offset-0 text-white font-semibold w-${width} h-${height} text-${text}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
