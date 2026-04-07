import type { uploadFile } from "../../../types/paths/pet/{petId}/uploadImage.types.js";

export const POST: uploadFile = ($) => {
  const pet = $.context.getPetById($.path.petId);
  if (!pet) {
    return { status: 404 };
  }
  return {
    status: 200,
    body: {
      code: 200,
      type: "unknown",
      message: `File uploaded for pet ${$.path.petId}`,
    },
  };
};
