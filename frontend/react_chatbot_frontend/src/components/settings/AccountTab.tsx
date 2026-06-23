interface AccountTabProps {
  isLoggedIn?: boolean;
  user?: {
    name: string;
    email: string;
  } | null;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

export default function AccountTab({
  isLoggedIn = false,
  user = null,
  onLoginClick,
  onLogoutClick
}: AccountTabProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Account</h3>
        <p className="text-sm text-gray-500">Manage your subscription and profile details.</p>
      </div>

      {!isLoggedIn || !user ? (
        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center text-center gap-4 bg-gray-50/50">
          <div className="text-sm text-gray-600">You are not logged in.</div>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onLoginClick}
              className="rounded-full bg-black text-white px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
            <span className="text-xs text-gray-400">or</span>
            <span className="text-sm text-gray-500 font-medium">Continue as Guest</span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Name</div>
              <div className="text-sm font-medium text-gray-800 mt-0.5">{user.name}</div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Email</div>
              <div className="text-sm font-medium text-gray-800 mt-0.5">{user.email}</div>
            </div>
            <button
              onClick={onLogoutClick}
              className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}