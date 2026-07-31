import Newsletter from "../../models/newsletter.model.js";

export const getSubscribers = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
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
      message: "Subscriber deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
