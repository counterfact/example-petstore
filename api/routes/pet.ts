import type { updatePet } from "../types/paths/pet.types.js";
import type { addPet } from "../types/paths/pet.types.js";

export const PUT: updatePet = ($) => {
  if (!$.body.id) {
    return $.response[400];
  }
  const updated = $.context.updatePet($.body);
  if (!updated) {
    return $.response[404];
  }
  return $.response[200].json(updated);
};

export const POST: addPet = ($) => {
  const pet = $.context.addPet($.body);
  return $.response[200].json(pet);
};
