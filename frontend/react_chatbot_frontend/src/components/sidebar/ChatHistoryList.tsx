import { Link, useParams } from 'react-router-dom';
import type { ChatHistoryItem } from '../../services/authService';

interface ChatHistoryListProps {
  items: ChatHistoryItem[];
}

export default function ChatHistoryList({ items }: ChatHistoryListProps) {
  const { chatId } = useParams(); 

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2">
      {items.length > 0 && (
        <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2">Today</h3>
      )}

      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = chatId === item.chatId;

          return (
            <Link
              key={item.chatId}
              to={`/${item.chatId}`}
              className={`flex items-center w-full px-2 py-2 text-sm rounded-lg truncate text-left transition-colors
                ${isActive 
                  ? 'bg-gray-200 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-200'
                }
              `}
              title={item.title}
            >
              {item.title}
            </Link>
          );
        })}

        {items.length === 0 && (
          <div className="px-2 text-xs text-gray-400 text-center mt-4">
            Belum ada riwayat
          </div>
        )}
      </div>
    </div>
  );
}