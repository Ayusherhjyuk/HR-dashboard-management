
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md ${className}`}>
      {children}
    </div>
  );
}
