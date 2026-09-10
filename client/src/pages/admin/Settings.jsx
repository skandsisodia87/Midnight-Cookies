import React, { useState } from "react";
import {
  FiUser,
  FiShoppingBag,
  FiBell,
  FiShield,
  FiCreditCard,
  FiTruck,
  FiSave,
} from "react-icons/fi";
import Account from "../../components/admin/settings/Account";
import Notifications from "../../components/admin/settings/Notifications";
import Payment from "../../components/admin/settings/Payment";
import General from "../../components/admin/settings/General";
import Shipping from "../../components/admin/settings/Shipping";
import Security from "../../components/admin/settings/Security";
import DeliveryAgents from "../../components/admin/settings/DeliveryAgents";

const settingsSections = [
  {
    id: "general",
    label: "General",
    icon: FiShoppingBag,
  },
  {
    id: "account",
    label: "Account",
    icon: FiUser,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: FiBell,
  },
  {
    id: "security",
    label: "Security",
    icon: FiShield,
  },
  {
    id: "payment",
    label: "Payment",
    icon: FiCreditCard,
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: FiTruck,
  },
  {
    id: "delivery-agents",
    label: "Delivery Agents",
    icon: FiTruck,
  },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("general");

  const [settings, setSettings] = useState({
    storeName: "Midnight Cookies",
    storeEmail: "hello@midnightcookies.com",
    storePhone: "+91 98765 43210",
    currency: "INR",
    timezone: "Asia/Kolkata",

    adminName: "Admin",
    adminEmail: "admin@midnightcookies.com",

    orderNotifications: true,
    customerNotifications: true,
    newsletterNotifications: false,

    twoFactorAuth: false,

    onlinePayment: true,
    cashOnDelivery: true,

    freeShipping: true,
    freeShippingAmount: "999",
    deliveryCharge: "99",
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return <Account settings={settings} handleChange={handleChange} />;

      case "notifications":
        return (
          <Notifications settings={settings} handleChange={handleChange} />
        );

      case "security":
        return <Security settings={settings} handleChange={handleChange} />;

      case "payment":
        return <Payment settings={settings} handleChange={handleChange} />;

      case "shipping":
        return <Shipping settings={settings} handleChange={handleChange} />;

      case "delivery-agents":
        return <DeliveryAgents />;

      default:
        return <General settings={settings} handleChange={handleChange} />;
    }
  };

  const activeItem = settingsSections.find((item) => item.id === activeSection);

  const ActiveIcon = activeItem?.icon || FiShoppingBag;

  return (
    <div className="space-y-5 px-3 pb-8 sm:px-4 lg:px-6">
      <div className="rounded-[28px] border border-[#F3E4D4] bg-linear-to-r from-[#FFF7EC] via-white to-[#FFFDF8] p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-[#4E342E] sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-[#7A5C4D] sm:text-base">
          Manage your Midnight Cookies store, account and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-[#F0DCCB] bg-white p-3 shadow-[0_4px_20px_rgba(78,52,46,0.04)]">
          <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#A1887F]">
            Settings
          </div>

          <div className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-[#FFF0E4] text-[#A15C38]"
                      : "text-[#6D4C41] hover:bg-[#FFF8F2]"
                  }`}
                >
                  <Icon size={18} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="min-w-0 rounded-2xl border border-[#F0DCCB] bg-white shadow-[0_4px_20px_rgba(78,52,46,0.04)]">
          <div className="border-b border-[#F3E4D4] px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0E4] text-[#A15C38]">
                <ActiveIcon size={19} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#A15C38]">
                  Midnight Cookies
                </p>

                <p className="text-xs text-[#A1887F]">Store configuration</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">{renderContent()}</div>

          <div className="flex justify-end border-t border-[#F3E4D4] px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-[#A15C38] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8F4E30] active:scale-[0.98]"
            >
              <FiSave size={17} />
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
