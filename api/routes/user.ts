import type { createUser } from "../types/paths/user.types.js";

export const POST: createUser = ($) => {
  const user = $.context.addUser($.body);
  return $.response[200].json(user);
};
