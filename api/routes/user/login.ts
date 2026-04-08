import type { loginUser } from "../../types/paths/user/login.types.js";

export const GET: loginUser = ($) => {
  const user = $.context.users.find(
    (u) => u.username === $.query.username && u.password === $.query.password,
  );
  if (!user) {
    return $.response[400];
  }
  return $.response[200].json(`Logged in as ${user.username}`);
};
