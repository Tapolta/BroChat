export default function AppearanceTab() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
        <p className="text-sm text-gray-500">Customize how BroChat looks on your screen.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 p-4 flex justify-between items-center">
        <div>
          <div className="text-sm font-medium text-gray-800">Theme</div>
          <div className="text-xs text-gray-400 mt-0.5">Light theme is currently active.</div>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 px-4 py-2 rounded-xl">
          <span>☀</span>
          <span>Light</span>
        </div>
      </div>
    </div>
  );
}