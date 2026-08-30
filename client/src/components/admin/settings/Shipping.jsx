import constants from "../../../common/constants";
import SettingToggle from "./SettingToggle";

export default function Shipping({ settings, handleChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#4E342E]">
          Shipping & Delivery
        </h2>

        <p className="mt-1 text-sm text-[#8D6E63]">
          Configure your delivery charges and free shipping rules.
        </p>
      </div>

      <SettingToggle
        title="Free Shipping"
        description="Enable free shipping when the order reaches a certain amount."
        enabled={settings.freeShipping}
        onChange={(value) => handleChange("freeShipping", value)}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Free Shipping Above
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8D6E63]">
              ₹
            </span>

            <input
              type="number"
              value={settings.freeShippingAmount}
              onChange={(e) =>
                handleChange("freeShippingAmount", e.target.value)
              }
              className={`${constants.INPUT_CLASS} pl-8`}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#5D4037]">
            Delivery Charge
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8D6E63]">
              ₹
            </span>

            <input
              type="number"
              value={settings.deliveryCharge}
              onChange={(e) => handleChange("deliveryCharge", e.target.value)}
              className={`${constants.INPUT_CLASS} pl-8`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
