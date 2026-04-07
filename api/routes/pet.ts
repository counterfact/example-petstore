import type { updatePet } from "../types/paths/pet.types.js";
import type { addPet } from "../types/paths/pet.types.js";

export const PUT: updatePet = ($) => {
  if (!$.body.id) {
    return { status: 400 };
  }
  const updated = $.context.updatePet($.body);
  if (!updated) {
    return { status: 404 };
  }
  return { status: 200, body: updated };
};

export const POST: addPet = ($) => {
  const pet = $.context.addPet($.body);
  return { status: 200, body: pet };
};
