import type { findPetsByStatus } from "../../types/paths/pet/findByStatus.types.js";

export const GET: findPetsByStatus = ($) => {
  const pets = $.context.findPetsByStatus($.query.status);
  return { status: 200, body: pets };
};
