import type { getUserByName } from "../../types/paths/user/{username}.types.js";
import type { updateUser } from "../../types/paths/user/{username}.types.js";
import type { deleteUser } from "../../types/paths/user/{username}.types.js";

export const GET: getUserByName = ($) => {
  const user = $.context.getUserByUsername($.path.username);
  if (!user) {
    return { status: 404 };
  }
  return { status: 200, body: user };
};

export const PUT: updateUser = ($) => {
  const updated = $.context.updateUser($.path.username, $.body);
  if (!updated) {
    return { status: 404 };
  }
  return { status: 200 };
};

export const DELETE: deleteUser = ($) => {
  const deleted = $.context.deleteUser($.path.username);
  if (!deleted) {
    return { status: 404 };
  }
  return { status: 200 };
};
