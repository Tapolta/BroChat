import type { Message } from '../hooks/useChat';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col gap-8 w-full">
      {messages.map((msg, index) => (
        <MessageBubble 
          key={index} 
          role={msg.role} 
          content={msg.content} 
        />
      ))}
    </div>
  );
}