import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface MessageBubbleProps {
  role: 'user' | 'assistant' | string;
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const renderContent = (text: string): React.ReactNode[] => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return null;
      return <p key={index}>{line}</p>;
    });
  };

  if (role === 'user') {
    return (
      <div className="flex w-full justify-end">
        <div className="max-w-[70%] rounded-3xl bg-gray-100 px-5 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="text-[15px] leading-7 text-gray-900 font-normal space-y-4 whitespace-pre-wrap">
            {renderContent(content)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start">
      <div className="w-full max-w-[800px] flex flex-col gap-1.5">
        
        <div className="text-sm font-semibold text-gray-800">
          AI Assistant
        </div>
        
        <div className="text-[15px] leading-relaxed text-gray-800 font-normal space-y-2 w-full overflow-x-auto whitespace-pre-wrap">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              strong: ({node, ...props}) => <strong className="font-bold text-gray-950" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc ml-6 space-y-0.5 my-1 text-gray-800" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal ml-6 space-y-0.5 my-1 text-gray-800" {...props} />,
              li: ({node, ...props}) => <li className="m-0 p-0" {...props} />,
              code: ({node, ...props}) => <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm border border-gray-200" {...props} />,
              p: ({node, ...props}) => <p className="m-0 leading-relaxed" {...props} />,
              table: ({node, ...props}) => (
                <div className="my-3 overflow-x-auto rounded-xl border border-gray-200 shadow-sm max-w-full">
                  <table className="w-full border-collapse text-left text-sm" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-semibold" {...props} />,
              th: ({node, ...props}) => <th className="px-4 py-2 font-medium border-r border-gray-200 last:border-r-0" {...props} />,
              tbody: ({node, ...props}) => <tbody className="divide-y divide-gray-200 text-gray-700 bg-white" {...props} />,
              td: ({node, ...props}) => <td className="px-4 py-2 border-r border-gray-200 last:border-r-0" {...props} />
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
        
      </div>
    </div>
  );
}