import type { getOrderById } from "../../../types/paths/store/order/{orderId}.types.js";
import type { deleteOrder } from "../../../types/paths/store/order/{orderId}.types.js";

export const GET: getOrderById = ($) => {
  const order = $.context.getOrderById(Number($.path.orderId));
  if (!order) {
    return $.response[404];
  }
  return $.response[200].json(order);
};

export const DELETE: deleteOrder = ($) => {
  const deleted = $.context.deleteOrder(Number($.path.orderId));
  if (!deleted) {
    return $.response[404];
  }
  return $.response[200];
};
