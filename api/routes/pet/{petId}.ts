import type { getPetById } from "../../types/paths/pet/{petId}.types.js";
import type { updatePetWithForm } from "../../types/paths/pet/{petId}.types.js";
import type { deletePet } from "../../types/paths/pet/{petId}.types.js";

export const GET: getPetById = ($) => {
  const pet = $.context.getPetById($.path.petId);
  if (!pet) {
    return $.response[404];
  }
  return $.response[200].json(pet);
};

export const POST: updatePetWithForm = ($) => {
  const pet = $.context.getPetById($.path.petId);
  if (!pet) {
    return $.response[400];
  }
  const updated = $.context.updatePet({
    ...pet,
    ...($.query.name !== undefined ? { name: $.query.name } : {}),
    ...($.query.status !== undefined
      ? { status: $.query.status as "available" | "pending" | "sold" }
      : {}),
  });
  if (!updated) {
    return $.response[400];
  }
  return $.response[200].json(updated);
};

export const DELETE: deletePet = ($) => {
  const deleted = $.context.deletePet($.path.petId);
  if (!deleted) {
    return $.response[400];
  }
  return $.response[200];
};
