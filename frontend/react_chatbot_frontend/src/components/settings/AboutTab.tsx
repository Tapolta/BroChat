export default function AboutTab() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">About</h3>
        <p className="text-sm text-gray-500">Information about the application.</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <h4 className="text-xl font-bold text-gray-900">BroChat</h4>
          <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            Version 1.0
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          AI assistant designed to help users interact naturally.
        </p>

        <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
          Made with React, FastAPI and AI models.
        </p>
      </div>
    </div>
  );
}