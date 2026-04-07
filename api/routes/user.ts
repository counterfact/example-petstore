import type { createUser } from "../types/paths/user.types.js";

export const POST: createUser = ($) => {
  const user = $.context.addUser($.body);
  return { status: 200, body: user };
};
