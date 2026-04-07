import type { getOrderById } from "../../../types/paths/store/order/{orderId}.types.js";
import type { deleteOrder } from "../../../types/paths/store/order/{orderId}.types.js";

export const GET: getOrderById = ($) => {
  const order = $.context.getOrderById($.path.orderId);
  if (!order) {
    return { status: 404 };
  }
  return { status: 200, body: order };
};

export const DELETE: deleteOrder = ($) => {
  const deleted = $.context.deleteOrder($.path.orderId);
  if (!deleted) {
    return { status: 404 };
  }
  return { status: 200 };
};
