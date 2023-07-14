const pass = (oldTier, newTier) => {
  oldTier = parseInt(oldTier.replace(/[^0-9]/g, ""));
  newTier = parseInt(newTier.replace(/[^0-9]/g, ""));
  if (newTier > oldTier) {
    return "https://cdn.pixabay.com/photo/2020/04/10/13/28/success-5025797_1280.png";
  } else {
    return "https://freepngimg.com/download/fail_stamp/4-2-fail-stamp-transparent.png";
  }
};
module.exports = pass;
