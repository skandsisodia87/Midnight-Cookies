import constants from "../../../common/constants";

export default function General({ settings, handleChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#4E342E]">
          Store Information
        </h2>
        <p className="mt-1 text-sm text-[#8D6E63]">
          Manage your basic store information.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Store Name
          </label>
          <input
            value={settings.storeName}
            onChange={(e) => handleChange("storeName", e.target.value)}
            className={constants.INPUT_CLASS}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Store Email
          </label>
          <input
            type="email"
            value={settings.storeEmail}
            onChange={(e) => handleChange("storeEmail", e.target.value)}
            className={constants.INPUT_CLASS}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Store Phone
          </label>
          <input
            value={settings.storePhone}
            onChange={(e) => handleChange("storePhone", e.target.value)}
            className={constants.INPUT_CLASS}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Currency
          </label>

          <select
            value={settings.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
            className={constants.INPUT_CLASS}
          >
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Timezone
          </label>

          <select
            value={settings.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
            className={constants.INPUT_CLASS}
          >
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="Asia/Dubai">Asia/Dubai</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>
      </div>
    </div>
  );
}
