import type { loginUser } from "../../types/paths/user/login.types.js";

export const GET: loginUser = ($) => {
  const user = $.context.users.find(
    (u) => u.username === $.query.username && u.password === $.query.password,
  );
  if (!user) {
    return { status: 400 };
  }
  return { status: 200, body: `Logged in as ${user.username}` };
};
