import Newsletter from "../../models/newsletter.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendEmail } from "../../services/email.service.js";
import newsletterEmailTemplate from "../../templates/newsletterEmailTemplate.js";

export const getSubscribers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.body;

  const options = {
    page: Math.max(Number(page), 1),
    limit: Math.max(Number(limit), 1),
    sort: { createdAt: -1 },
    lean: true,
  };

  const filter = {};

  if (search) {
    filter.email = { $regex: search, $options: "i" };
  }

  const subscribers = await Newsletter.paginate(filter, options);

  return res.status(200).json({
    success: true,
    message: "Subscribers fetched successfully",
    data: subscribers.docs,
    pagination: {
      totalDocs: subscribers.totalDocs,
      totalPages: subscribers.totalPages,
      // page: subscribers.page,
      // limit: subscribers.limit,
      hasPrevPage: subscribers.hasPrevPage,
      hasNextPage: subscribers.hasNextPage,
      prevPage: subscribers.prevPage,
      nextPage: subscribers.nextPage,
    },
  });
});

export const sendNewsletter = asyncHandler(async (req, res) => {
  const { audience, subject, previewText, content } = req.body;

  if (!subject?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Newsletter subject is required.",
    });
  }

  if (!content?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Newsletter content is required.",
    });
  }

  const normalizedAudience = String(audience || "All").trim();
  const baseFilter = { isVerified: true };

  if (normalizedAudience === "users") {
    baseFilter.isUser = true;
  } else if (normalizedAudience === "guests") {
    baseFilter.isUser = false;
  }

  const recipients = await Newsletter.find(baseFilter).select(
    "email isUser isVerified",
  );

  if (!recipients.length) {
    return res.status(400).json({
      success: false,
      message: "No verified subscribers match this audience.",
    });
  }

  const html = newsletterEmailTemplate({ subject, previewText, content });

  let sentCount = 0;
  const failures = [];

  for (const recipient of recipients) {
    try {
      await sendEmail({
        to: recipient.email,
        subject,
        html,
      });
      sentCount += 1;
    } catch (error) {
      failures.push(recipient.email);
      console.error(
        `Newsletter send failed for ${recipient.email}:`,
        error.message,
      );
    }
  }

  if (sentCount === 0) {
    return res.status(500).json({
      success: false,
      message: "Newsletter could not be sent to any subscribers.",
      failedRecipients: failures,
    });
  }

  return res.status(200).json({
    success: true,
    message: `Newsletter sent successfully to ${sentCount} subscriber${sentCount === 1 ? "" : "s"}.`,
    sentCount,
    failedRecipients: failures,
  });
});

export const removeSubscriber = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subscriber = await Newsletter.findByIdAndDelete(id);

  if (!subscriber) {
    return res.status(404).json({
      success: false,
      message: "Subscriber not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Subscriber removed successfully",
  });
});
