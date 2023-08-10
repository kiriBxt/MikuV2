function dupeChecker(array) {
  let checked = [];
  let dupe = false;

  let passedRoles = [];

  array.forEach((role) => {
    if (role) {
      if (checked.some((copy) => copy == role)) {
        dupe = true;
      }
      if (dupe === true) return true;
      checked.push(role);
      passedRoles.push(role);
    }
  });
  return checked;
}

module.exports = { dupeChecker };
