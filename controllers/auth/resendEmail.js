const { User } = require("../../models/users/user");
const { RequestError, sendEmail } = require("../../utils");

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.params;
  const user = User.findOne({ email });
  if (!user) {
    throw RequestError(404);
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Verify email",
    html: ` <a
        // target="_blank"
       ${BASE_URL}/api/auth/verify/${user.verificationToken}"
      >
        Click to verify email
      </a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;