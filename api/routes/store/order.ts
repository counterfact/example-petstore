import type { placeOrder } from "../../types/paths/store/order.types.js";

export const POST: placeOrder = ($) => {
  const order = $.context.placeOrder($.body);
  return { status: 200, body: order };
};
