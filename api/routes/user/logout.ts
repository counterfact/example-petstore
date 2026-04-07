import type { logoutUser } from "../../types/paths/user/logout.types.js";

export const GET: logoutUser = () => {
  return { status: 200 };
};
