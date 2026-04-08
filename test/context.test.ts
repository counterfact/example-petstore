import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Context } from "../api/routes/_.context.ts";

describe("Context", () => {
  let context: Context;

  beforeEach(() => {
    context = new Context();
  });

  describe("initial state", () => {
    it("has four pets", () => {
      assert.equal(context.pets.length, 4);
    });

    it("has two users", () => {
      assert.equal(context.users.length, 2);
    });

    it("has two orders", () => {
      assert.equal(context.orders.length, 2);
    });
  });

  describe("addPet", () => {
    it("adds the pet to the pets array", () => {
      context.addPet({ name: "Rex", photoUrls: [] });
      assert.equal(context.pets.length, 5);
    });

    it("assigns a new id to the added pet", () => {
      const pet = context.addPet({ name: "Rex", photoUrls: [] });
      assert.ok(typeof pet.id === "number");
    });

    it("returns the newly added pet", () => {
      const pet = context.addPet({ name: "Rex", photoUrls: [] });
      assert.equal(pet.name, "Rex");
    });

    it("increments the id for each new pet", () => {
      const first = context.addPet({ name: "Rex", photoUrls: [] });
      const second = context.addPet({ name: "Fido", photoUrls: [] });
      assert.equal(second.id, (first.id as number) + 1);
    });
  });

  describe("updatePet", () => {
    it("updates an existing pet and returns it", () => {
      const updated = context.updatePet({ id: 1, name: "Buddy Updated", photoUrls: [] });
      assert.equal(updated?.name, "Buddy Updated");
    });

    it("reflects the update in the pets array", () => {
      context.updatePet({ id: 1, name: "Buddy Updated", photoUrls: [] });
      assert.equal(context.pets.find((p) => p.id === 1)?.name, "Buddy Updated");
    });

    it("returns undefined when the pet does not exist", () => {
      const result = context.updatePet({ id: 999, name: "Ghost", photoUrls: [] });
      assert.equal(result, undefined);
    });
  });

  describe("getPetById", () => {
    it("returns the pet with the given id", () => {
      const pet = context.getPetById(1);
      assert.equal(pet?.name, "Buddy");
    });

    it("returns undefined when no pet has the given id", () => {
      assert.equal(context.getPetById(999), undefined);
    });
  });

  describe("deletePet", () => {
    it("removes the pet from the pets array", () => {
      context.deletePet(1);
      assert.equal(context.pets.find((p) => p.id === 1), undefined);
    });

    it("returns true when the pet was found and deleted", () => {
      assert.equal(context.deletePet(1), true);
    });

    it("returns false when the pet does not exist", () => {
      assert.equal(context.deletePet(999), false);
    });
  });

  describe("findPetsByStatus", () => {
    it("returns pets matching the given status", () => {
      const available = context.findPetsByStatus("available");
      assert.ok(available.every((p) => p.status === "available"));
    });

    it("returns the correct number of available pets", () => {
      assert.equal(context.findPetsByStatus("available").length, 2);
    });

    it("returns the correct number of pending pets", () => {
      assert.equal(context.findPetsByStatus("pending").length, 1);
    });

    it("returns the correct number of sold pets", () => {
      assert.equal(context.findPetsByStatus("sold").length, 1);
    });
  });

  describe("findPetsByTags", () => {
    it("returns pets that have any of the given tags", () => {
      const pets = context.findPetsByTags(["friendly"]);
      assert.equal(pets.length, 1);
      assert.equal(pets[0].name, "Buddy");
    });

    it("returns an empty array when no pets match the given tags", () => {
      assert.deepEqual(context.findPetsByTags(["unknown-tag"]), []);
    });

    it("returns pets matching any of multiple tags", () => {
      const pets = context.findPetsByTags(["friendly", "indoor"]);
      assert.equal(pets.length, 2);
    });
  });

  describe("addUser", () => {
    it("adds the user to the users array", () => {
      context.addUser({ username: "newuser" });
      assert.equal(context.users.length, 3);
    });

    it("assigns a new id to the added user", () => {
      const user = context.addUser({ username: "newuser" });
      assert.ok(typeof user.id === "number");
    });

    it("returns the newly added user", () => {
      const user = context.addUser({ username: "newuser" });
      assert.equal(user.username, "newuser");
    });

    it("increments the id for each new user", () => {
      const first = context.addUser({ username: "a" });
      const second = context.addUser({ username: "b" });
      assert.equal(second.id, (first.id as number) + 1);
    });
  });

  describe("getUserByUsername", () => {
    it("returns the user with the given username", () => {
      const user = context.getUserByUsername("user1");
      assert.equal(user?.firstName, "John");
    });

    it("returns undefined when no user has the given username", () => {
      assert.equal(context.getUserByUsername("nobody"), undefined);
    });
  });

  describe("updateUser", () => {
    it("updates an existing user and returns it", () => {
      const updated = context.updateUser("user1", { username: "user1", firstName: "Johnny" });
      assert.equal(updated?.firstName, "Johnny");
    });

    it("reflects the update in the users array", () => {
      context.updateUser("user1", { username: "user1", firstName: "Johnny" });
      assert.equal(context.getUserByUsername("user1")?.firstName, "Johnny");
    });

    it("returns undefined when the user does not exist", () => {
      const result = context.updateUser("nobody", { username: "nobody" });
      assert.equal(result, undefined);
    });
  });

  describe("deleteUser", () => {
    it("removes the user from the users array", () => {
      context.deleteUser("user1");
      assert.equal(context.getUserByUsername("user1"), undefined);
    });

    it("returns true when the user was found and deleted", () => {
      assert.equal(context.deleteUser("user1"), true);
    });

    it("returns false when the user does not exist", () => {
      assert.equal(context.deleteUser("nobody"), false);
    });
  });

  describe("placeOrder", () => {
    it("adds the order to the orders array", () => {
      context.placeOrder({ petId: 2, quantity: 1, status: "placed" });
      assert.equal(context.orders.length, 3);
    });

    it("assigns a new id to the placed order", () => {
      const order = context.placeOrder({ petId: 2, quantity: 1, status: "placed" });
      assert.ok(typeof order.id === "number");
    });

    it("returns the newly placed order", () => {
      const order = context.placeOrder({ petId: 2, quantity: 1, status: "placed" });
      assert.equal(order.petId, 2);
    });
  });

  describe("getOrderById", () => {
    it("returns the order with the given id", () => {
      const order = context.getOrderById(1);
      assert.equal(order?.petId, 1);
    });

    it("returns undefined when no order has the given id", () => {
      assert.equal(context.getOrderById(999), undefined);
    });
  });

  describe("deleteOrder", () => {
    it("removes the order from the orders array", () => {
      context.deleteOrder(1);
      assert.equal(context.getOrderById(1), undefined);
    });

    it("returns true when the order was found and deleted", () => {
      assert.equal(context.deleteOrder(1), true);
    });

    it("returns false when the order does not exist", () => {
      assert.equal(context.deleteOrder(999), false);
    });
  });

  describe("getInventory", () => {
    it("returns counts for available, pending, and sold", () => {
      const inventory = context.getInventory();
      assert.deepEqual(inventory, { available: 2, pending: 1, sold: 1 });
    });

    it("reflects changes after adding a pet", () => {
      context.addPet({ name: "NewPet", photoUrls: [], status: "available" });
      const inventory = context.getInventory();
      assert.equal(inventory.available, 3);
    });

    it("reflects changes after deleting a pet", () => {
      context.deletePet(1);
      const inventory = context.getInventory();
      assert.equal(inventory.available, 1);
    });
  });
});
