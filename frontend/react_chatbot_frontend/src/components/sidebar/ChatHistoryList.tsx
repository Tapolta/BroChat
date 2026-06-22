interface ChatHistoryListProps {
  items: string[];
}

export default function ChatHistoryList({ items }: ChatHistoryListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-3 py-2">
      <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2">Today</h3>
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <button 
            key={index}
            className="flex items-center w-full px-2 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-200 truncate text-left"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}