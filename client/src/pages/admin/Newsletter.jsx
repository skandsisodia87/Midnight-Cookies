import { useMemo, useState } from "react";
import {
  FiSearch,
  FiMail,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiTrash2,
  FiSend,
  FiX,
  FiAlertTriangle,
  FiUserCheck,
  FiUserX,
  FiCalendar,
} from "react-icons/fi";

import StatCard from "../../components/admin/newsletter/StatCard";
import SubscribersList from "../../components/admin/newsletter/SubscribersList";
import NewsletterModal from "../../components/admin/newsletter/NewsletterModal";
import DeleteDialog from "../../common/DeleteDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorPage from "../../common/ErrorPage";
import { getSubscribers, removeSubscriber } from "../../services/admin.service";
import NewsletterSkeleton from "../../components/admin/newsletter/NewsletterSkeleton";
import { toast } from "sonner";

const emptyNewsletter = {
  subject: "",
  previewText: "",
  content: "",
  audience: "all",
};

const Newsletter = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [newsletter, setNewsletter] = useState(emptyNewsletter);
  const [errors, setErrors] = useState({});

  const {
    data: subscribers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newsletter"],
    queryFn: getSubscribers,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const { mutate: deleteSubscriberMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: removeSubscriber,
      onSuccess: (res) => {
        toast.success(res?.message || "Subscriber removed successfully");
        queryClient.invalidateQueries(["newsletter"]);
        setSelectedSubscriber(null);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to remove subscriber",
        );
      },
    });

  const stats = useMemo(() => {
    const total = subscribers.length;

    const verified = subscribers.filter(
      (subscriber) => subscriber.isVerified,
    ).length;

    const pending = subscribers.filter(
      (subscriber) => !subscriber.isVerified,
    ).length;

    const registeredUsers = subscribers.filter(
      (subscriber) => subscriber.isUser,
    ).length;

    return {
      total,
      verified,
      pending,
      registeredUsers,
    };
  }, [subscribers]);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((subscriber) => {
      const matchesSearch = subscriber.email
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "verified" && subscriber.isVerified) ||
        (statusFilter === "pending" && !subscriber.isVerified);

      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "user" && subscriber.isUser) ||
        (typeFilter === "guest" && !subscriber.isUser);

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [subscribers, search, statusFilter, typeFilter]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDeleteSubscriber = () => {
    if (!selectedSubscriber) return;
    deleteSubscriberMutation(selectedSubscriber._id);
  };

  const handleNewsletterChange = (e) => {
    const { name, value } = e.target;

    setNewsletter((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateNewsletter = () => {
    const newErrors = {};

    if (!newsletter.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!newsletter.content.trim()) {
      newErrors.content = "Newsletter content is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSendNewsletter = (e) => {
    e.preventDefault();

    if (!validateNewsletter()) {
      return;
    }
    console.log("Newsletter Payload:", newsletter);

    setNewsletter(emptyNewsletter);
    setErrors({});
    setIsNewsletterOpen(false);
  };

  const openNewsletterModal = () => {
    setNewsletter(emptyNewsletter);
    setErrors({});
    setIsNewsletterOpen(true);
  };

  const closeNewsletterModal = () => {
    setIsNewsletterOpen(false);
    setNewsletter(emptyNewsletter);
    setErrors({});
  };

  if (isLoading) {
    return <NewsletterSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen px-4 py-12 bg-[#FFF6EC]">
        <div className="max-w-4xl mx-auto">
          <ErrorPage
            title="Unable to load newsletter"
            message="There was an issue fetching your admin data. Please try again or return to the admin home page."
            buttonText="Go Back"
            redirectLink="/admin"
          />
        </div>
      </div>
    );
  }

  {
    console.log(subscribers, "subscribers");
  }
  return (
    <div className="pb-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#D98B2B]">
                <FiMail size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#4E342E] sm:text-3xl">
                  Newsletter
                </h1>

                <p className="mt-1 text-sm text-[#8A7064] sm:text-base">
                  Manage subscribers and send newsletters to your customers.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openNewsletterModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4E342E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3E2723] active:scale-[0.98]"
          >
            <FiSend size={17} />
            Send Newsletter
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Subscribers"
            value={stats.total}
            icon={<FiMail size={20} />}
          />

          <StatCard
            title="Verified Subscribers"
            value={stats.verified}
            icon={<FiCheckCircle size={20} />}
          />

          <StatCard
            title="Pending Verification"
            value={stats.pending}
            icon={<FiClock size={20} />}
          />

          <StatCard
            title="Registered Users"
            value={stats.registeredUsers}
            icon={<FiUserCheck size={20} />}
          />
        </div>

        <SubscribersList
          filteredSubscribers={filteredSubscribers}
          subscribers={subscribers}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          setSelectedSubscriber={setSelectedSubscriber}
          formatDate={formatDate}
        />
      </div>

      <NewsletterModal
        isOpen={isNewsletterOpen}
        close={closeNewsletterModal}
        onSubmit={handleSendNewsletter}
        newsletter={newsletter}
        onChange={handleNewsletterChange}
        errors={errors}
        subscribers={subscribers}
      />

      <DeleteDialog
        open={Boolean(selectedSubscriber)}
        onClose={() => setSelectedSubscriber(null)}
        onConfirm={handleDeleteSubscriber}
        title="Remove Subscriber?"
        message={
          selectedSubscriber
            ? `Are you sure you want to remove ${selectedSubscriber.email} from your newsletter subscribers?`
            : ""
        }
        confirmLabel="Remove Subscriber"
      />
    </div>
  );
};

export default Newsletter;
