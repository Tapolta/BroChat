import Divider from "../login/Divider";
import EmailLoginForm from "../login/EmailLoginForm";
import SocialLoginGroup from "../login/SocialLoginGroup";
import BaseModal from "../modal/BaseModal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <BaseModal open={isOpen} onClose={onClose} title="" size="sm">
      <div className="flex flex-col gap-6 -mt-4 px-2 pb-2">
        <div className="text-center flex flex-col gap-2 mt-2">
          <h2 className="text-[28px] font-semibold text-gray-900 tracking-tight leading-none">
            Log in atau sign up
          </h2>
          <p className="text-gray-500 text-[14px] px-4 leading-normal">
            Login untuk akses ke semua data kampus, tugas, jadwal, dan fitur lainnya!
          </p>
        </div>

        <SocialLoginGroup />

        <Divider />

        <EmailLoginForm onSuccessClose={onClose} />
      </div>
    </BaseModal>
  );
}