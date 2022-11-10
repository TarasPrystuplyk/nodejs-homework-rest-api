const { User } = require("../../models/users");
const { RequestError } = require("../../utils/RequestError");
const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!user) {
    throw RequestError(404);
  }

  res.status(200).json({
    user,
  });
};

module.exports = updateSubscription;