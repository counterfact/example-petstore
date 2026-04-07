import type { createUsersWithListInput } from "../../types/paths/user/createWithList.types.js";

export const POST: createUsersWithListInput = ($) => {
  const users = $.body.map((user) => $.context.addUser(user));
  return { status: 200, body: users[0] };
};
