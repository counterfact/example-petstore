import type { findPetsByTags } from "../../types/paths/pet/findByTags.types.js";

export const GET: findPetsByTags = ($) => {
  const pets = $.context.findPetsByTags($.query.tags);
  return { status: 200, body: pets };
};
