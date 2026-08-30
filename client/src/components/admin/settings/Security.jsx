import { FiLock } from "react-icons/fi";
import SettingToggle from "./SettingToggle";

export default function Security({ settings, handleChange }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-[#4E342E]">Security</h2>

        <p className="mt-1 text-sm text-[#8D6E63]">
          Protect your admin account and store.
        </p>
      </div>

      <SettingToggle
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your admin account."
        enabled={settings.twoFactorAuth}
        onChange={(value) => handleChange("twoFactorAuth", value)}
      />

      <div className="rounded-2xl border border-[#F1DED0] bg-[#FFF8F2] p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#A15C38]">
            <FiLock size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-[#4E342E]">
              Secure Admin Access
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#8D6E63]">
              Use a strong password and avoid sharing your admin credentials
              with anyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
