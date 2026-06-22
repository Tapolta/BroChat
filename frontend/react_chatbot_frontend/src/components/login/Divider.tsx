export default function Divider() {
  return (
    <div className="relative flex py-1 items-center">
      <div className="flex-grow border-t border-gray-200"></div>
      <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        OR
      </span>
      <div className="flex-grow border-t border-gray-200"></div>
    </div>
  );
}