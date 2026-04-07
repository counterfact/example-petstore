import type { createUsersWithListInput } from "../../types/paths/user/createWithList.types.js";

export const POST: createUsersWithListInput = ($) => {
  const users = $.body.map((user) => $.context.addUser(user));
  // The OpenAPI spec returns a single User on 200; return the first created user
  return $.response[200].json(users[0]);
};
