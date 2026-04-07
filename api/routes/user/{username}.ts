import type { getUserByName } from "../../types/paths/user/{username}.types.js";
import type { updateUser } from "../../types/paths/user/{username}.types.js";
import type { deleteUser } from "../../types/paths/user/{username}.types.js";

export const GET: getUserByName = ($) => {
  const user = $.context.getUserByUsername($.path.username);
  if (!user) {
    return $.response[404];
  }
  return $.response[200].json(user);
};

export const PUT: updateUser = ($) => {
  const updated = $.context.updateUser($.path.username, $.body);
  if (!updated) {
    return $.response[404];
  }
  return $.response[200];
};

export const DELETE: deleteUser = ($) => {
  const deleted = $.context.deleteUser($.path.username);
  if (!deleted) {
    return $.response[404];
  }
  return $.response[200];
};
