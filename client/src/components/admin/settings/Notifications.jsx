import SettingToggle from "./SettingToggle";

export default function Notifications({ settings, handleChange }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-[#4E342E]">Notifications</h2>

        <p className="mt-1 text-sm text-[#8D6E63]">
          Control which notifications you receive.
        </p>
      </div>

      <SettingToggle
        title="Order Notifications"
        description="Get notified whenever a new order is placed."
        enabled={settings.orderNotifications}
        onChange={(value) => handleChange("orderNotifications", value)}
      />

      <SettingToggle
        title="Customer Notifications"
        description="Receive alerts about customer activity."
        enabled={settings.customerNotifications}
        onChange={(value) => handleChange("customerNotifications", value)}
      />

      <SettingToggle
        title="Newsletter Notifications"
        description="Receive updates about newsletter subscriptions."
        enabled={settings.newsletterNotifications}
        onChange={(value) => handleChange("newsletterNotifications", value)}
      />
    </div>
  );
}
