import React from "react";
import constants from "../../../common/constants";

export default function Account({ settings, handleChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#4E342E]">Admin Account</h2>
        <p className="mt-1 text-sm text-[#8D6E63]">
          Update your administrator profile information.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Admin Name
          </label>
          <input
            value={settings.adminName}
            onChange={(e) => handleChange("adminName", e.target.value)}
            className={constants.INPUT_CLASS}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Admin Email
          </label>
          <input
            type="email"
            value={settings.adminEmail}
            onChange={(e) => handleChange("adminEmail", e.target.value)}
            className={constants.INPUT_CLASS}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className={constants.INPUT_CLASS}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className={constants.INPUT_CLASS}
          />
        </div>
      </div>
    </div>
  );
}
