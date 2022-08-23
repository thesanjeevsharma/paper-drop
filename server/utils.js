const sanitizeDrops = (drops, options) =>
   drops.map((drop) => ({
      _id: drop._id,
      location: {
         longitude: drop.location.coordinates[0],
         latitude: drop.location.coordinates[1],
      },
      author: drop.isAnonymous ? 'Anonymous' : drop.user.firstName,
      createdAt: drop.createdAt,
      readBy: drop.readBy.length,
      ...(options?.withMessage && { message: drop.message }),
   }));

module.exports = {
   sanitizeDrops,
};
