import SettingToggle from "./SettingToggle";

export default function Payment({ settings, handleChange }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-[#4E342E]">
          Payment Methods
        </h2>

        <p className="mt-1 text-sm text-[#8D6E63]">
          Select the payment methods available to customers.
        </p>
      </div>

      <SettingToggle
        title="Online Payment"
        description="Accept payments through online payment gateways."
        enabled={settings.onlinePayment}
        onChange={(value) => handleChange("onlinePayment", value)}
      />

      <SettingToggle
        title="Cash on Delivery"
        description="Allow customers to pay when their order is delivered."
        enabled={settings.cashOnDelivery}
        onChange={(value) => handleChange("cashOnDelivery", value)}
      />
    </div>
  );
}
