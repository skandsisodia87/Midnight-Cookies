const updatePublicId = async () => {
  const cookies = await cookieModel.find({}).lean();

  cookies.forEach(async (item) => {
    const public_id = data[item.slug];
    console.log(public_id);
    const img = [
      {
        url: item.images[0],
        public_id,
      },
    ];
    await cookieModel.findByIdAndUpdate(item._id, {
      $set: {
        images: img,
      },
    });
  });
};
