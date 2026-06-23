export default function GeneralTab() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">General</h3>
        <p className="text-sm text-gray-500">Manage your basic application settings.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-gray-800">Language</div>
            <div className="text-xs text-gray-400">App display language</div>
          </div>
          <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
            English
          </span>
        </div>

        <div className="border-t border-gray-100 my-1" />

        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-gray-800">Region</div>
            <div className="text-xs text-gray-400">Locality settings</div>
          </div>
          <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
            Indonesia
          </span>
        </div>
      </div>
    </div>
  );
}