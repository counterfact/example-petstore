import type { findPetsByStatus } from "../../types/paths/pet/findByStatus.types.js";

export const GET: findPetsByStatus = ($) => {
  const pets = $.context.findPetsByStatus($.query.status);
  return $.response[200].json(pets);
};
