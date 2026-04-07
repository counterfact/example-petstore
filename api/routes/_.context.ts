/**
 * This is the default context for Counterfact.
 *
 * It defines the context object in the REPL
 * and the $.context object in the code.
 *
 * Add properties and methods to suit your needs.
 *
 * See https://counterfact.dev/docs/usage.html#working-with-state-the-codecontextcode-object-and-codecontexttscode
 */

import type { Pet } from "../types/components/schemas/Pet.js";
import type { User } from "../types/components/schemas/User.js";
import type { Order } from "../types/components/schemas/Order.js";

export class Context {
  pets: Pet[] = [
    {
      id: 1,
      name: "Buddy",
      category: { id: 1, name: "Dogs" },
      photoUrls: ["https://example.com/buddy.jpg"],
      tags: [{ id: 1, name: "friendly" }],
      status: "available",
    },
    {
      id: 2,
      name: "Whiskers",
      category: { id: 2, name: "Cats" },
      photoUrls: ["https://example.com/whiskers.jpg"],
      tags: [{ id: 2, name: "indoor" }],
      status: "available",
    },
    {
      id: 3,
      name: "Goldie",
      category: { id: 3, name: "Fish" },
      photoUrls: ["https://example.com/goldie.jpg"],
      tags: [],
      status: "pending",
    },
    {
      id: 4,
      name: "Max",
      category: { id: 1, name: "Dogs" },
      photoUrls: ["https://example.com/max.jpg"],
      tags: [{ id: 3, name: "trained" }],
      status: "sold",
    },
  ];

  users: User[] = [
    {
      id: 1,
      username: "user1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      phone: "555-1234",
      userStatus: 1,
    },
    {
      id: 2,
      username: "jane_smith",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      password: "secret456",
      phone: "555-5678",
      userStatus: 1,
    },
  ];

  orders: Order[] = [
    {
      id: 1,
      petId: 1,
      quantity: 1,
      shipDate: "2024-01-15T10:00:00Z",
      status: "placed",
      complete: false,
    },
    {
      id: 2,
      petId: 4,
      quantity: 1,
      shipDate: "2024-01-10T08:00:00Z",
      status: "delivered",
      complete: true,
    },
  ];

  private nextPetId = 5;
  private nextUserId = 3;
  private nextOrderId = 3;

  addPet(pet: Pet): Pet {
    const newPet = { ...pet, id: this.nextPetId++ };
    this.pets.push(newPet);
    return newPet;
  }

  updatePet(pet: Pet): Pet | undefined {
    const index = this.pets.findIndex((p) => p.id === pet.id);
    if (index === -1) return undefined;
    this.pets[index] = pet;
    return pet;
  }

  getPetById(id: number): Pet | undefined {
    return this.pets.find((p) => p.id === id);
  }

  deletePet(id: number): boolean {
    const index = this.pets.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.pets.splice(index, 1);
    return true;
  }

  findPetsByStatus(status: string): Pet[] {
    return this.pets.filter((p) => p.status === status);
  }

  findPetsByTags(tags: string[]): Pet[] {
    return this.pets.filter((p) =>
      p.tags?.some((t) => t.name !== undefined && tags.includes(t.name)),
    );
  }

  addUser(user: User): User {
    const newUser = { ...user, id: this.nextUserId++ };
    this.users.push(newUser);
    return newUser;
  }

  getUserByUsername(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }

  updateUser(username: string, user: User): User | undefined {
    const index = this.users.findIndex((u) => u.username === username);
    if (index === -1) return undefined;
    this.users[index] = { ...user, username };
    return this.users[index];
  }

  deleteUser(username: string): boolean {
    const index = this.users.findIndex((u) => u.username === username);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  placeOrder(order: Order): Order {
    const newOrder = { ...order, id: this.nextOrderId++ };
    this.orders.push(newOrder);
    return newOrder;
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  deleteOrder(id: number): boolean {
    const index = this.orders.findIndex((o) => o.id === id);
    if (index === -1) return false;
    this.orders.splice(index, 1);
    return true;
  }

  getInventory(): { [key: string]: number } {
    const inventory: { [key: string]: number } = {
      available: 0,
      pending: 0,
      sold: 0,
    };
    for (const pet of this.pets) {
      if (pet.status) {
        inventory[pet.status] = (inventory[pet.status] ?? 0) + 1;
      }
    }
    return inventory;
  }
}
