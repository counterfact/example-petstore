import type { uploadFile } from "../../../types/paths/pet/{petId}/uploadImage.types.js";

export const POST: uploadFile = ($) => {
  const pet = $.context.getPetById(Number($.path.petId));
  if (!pet) {
    return $.response[404];
  }
  return $.response[200].json({
    code: 200,
    type: "unknown",
    message: `File uploaded for pet ${$.path.petId}`,
  });
};
