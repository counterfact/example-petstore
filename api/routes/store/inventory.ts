import type { getInventory } from "../../types/paths/store/inventory.types.js";

export const GET: getInventory = ($) => {
  const inventory = $.context.getInventory();
  return { status: 200, body: inventory };
};
