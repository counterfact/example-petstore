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

interface Scenario {
  pets: Pet[];
  users: User[];
  orders: Order[];
}

/**
 * Pre-defined scenarios that can be loaded into the context at any time.
 *
 * Load a scenario from the REPL with:
 *   context.loadScenario("empty")
 *
 * Available scenarios: startup, empty, sold-out, busy
 */
const SCENARIOS: Record<string, Scenario> = {
  /**
   * Default startup state: a small mix of pets, a couple of users, and a
   * couple of orders — enough for basic end-to-end exploration.
   */
  startup: {
    pets: [
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
    ],
    users: [
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
    ],
    orders: [
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
    ],
  },

  /**
   * Empty store: no pets, users, or orders.
   * Useful for testing the "no data" state or building up state from scratch.
   */
  empty: {
    pets: [],
    users: [],
    orders: [],
  },

  /**
   * Sold-out store: all pets have been sold and all orders are complete.
   * Useful for testing behaviour when no pets are available.
   */
  "sold-out": {
    pets: [
      {
        id: 1,
        name: "Buddy",
        category: { id: 1, name: "Dogs" },
        photoUrls: ["https://example.com/buddy.jpg"],
        tags: [{ id: 1, name: "friendly" }],
        status: "sold",
      },
      {
        id: 2,
        name: "Whiskers",
        category: { id: 2, name: "Cats" },
        photoUrls: ["https://example.com/whiskers.jpg"],
        tags: [{ id: 2, name: "indoor" }],
        status: "sold",
      },
      {
        id: 3,
        name: "Goldie",
        category: { id: 3, name: "Fish" },
        photoUrls: ["https://example.com/goldie.jpg"],
        tags: [],
        status: "sold",
      },
    ],
    users: [
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
    ],
    orders: [
      {
        id: 1,
        petId: 1,
        quantity: 1,
        shipDate: "2024-01-10T08:00:00Z",
        status: "delivered",
        complete: true,
      },
      {
        id: 2,
        petId: 2,
        quantity: 1,
        shipDate: "2024-01-11T09:00:00Z",
        status: "delivered",
        complete: true,
      },
      {
        id: 3,
        petId: 3,
        quantity: 1,
        shipDate: "2024-01-12T10:00:00Z",
        status: "delivered",
        complete: true,
      },
    ],
  },

  /**
   * Busy store: a large and varied inventory with many pending orders.
   * Useful for load-testing UI components or pagination.
   */
  busy: {
    pets: [
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
        status: "available",
      },
      {
        id: 4,
        name: "Max",
        category: { id: 1, name: "Dogs" },
        photoUrls: ["https://example.com/max.jpg"],
        tags: [{ id: 3, name: "trained" }],
        status: "available",
      },
      {
        id: 5,
        name: "Tweety",
        category: { id: 4, name: "Birds" },
        photoUrls: ["https://example.com/tweety.jpg"],
        tags: [{ id: 4, name: "singing" }],
        status: "available",
      },
      {
        id: 6,
        name: "Bella",
        category: { id: 1, name: "Dogs" },
        photoUrls: ["https://example.com/bella.jpg"],
        tags: [{ id: 1, name: "friendly" }],
        status: "pending",
      },
      {
        id: 7,
        name: "Luna",
        category: { id: 2, name: "Cats" },
        photoUrls: ["https://example.com/luna.jpg"],
        tags: [{ id: 2, name: "indoor" }],
        status: "pending",
      },
      {
        id: 8,
        name: "Charlie",
        category: { id: 1, name: "Dogs" },
        photoUrls: ["https://example.com/charlie.jpg"],
        tags: [{ id: 3, name: "trained" }],
        status: "sold",
      },
    ],
    users: [
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
      {
        id: 3,
        username: "bob_jones",
        firstName: "Bob",
        lastName: "Jones",
        email: "bob@example.com",
        password: "pass789",
        phone: "555-9012",
        userStatus: 1,
      },
    ],
    orders: [
      {
        id: 1,
        petId: 6,
        quantity: 1,
        shipDate: "2024-01-15T10:00:00Z",
        status: "placed",
        complete: false,
      },
      {
        id: 2,
        petId: 7,
        quantity: 1,
        shipDate: "2024-01-16T11:00:00Z",
        status: "approved",
        complete: false,
      },
      {
        id: 3,
        petId: 8,
        quantity: 1,
        shipDate: "2024-01-10T08:00:00Z",
        status: "delivered",
        complete: true,
      },
      {
        id: 4,
        petId: 1,
        quantity: 2,
        shipDate: "2024-01-17T09:00:00Z",
        status: "placed",
        complete: false,
      },
    ],
  },
};

export class Context {
  pets: Pet[] = [];
  users: User[] = [];
  orders: Order[] = [];

  private nextPetId = 1;
  private nextUserId = 1;
  private nextOrderId = 1;

  constructor() {
    this.loadScenario("startup");
  }

  /**
   * Load a named scenario, replacing all current pets, users, and orders.
   *
   * Available scenarios: startup, empty, sold-out, busy
   *
   * Example (from the REPL):
   *   context.loadScenario("empty")
   */
  loadScenario(name: string): void {
    const scenario = SCENARIOS[name];
    if (!scenario) {
      throw new Error(
        `Scenario "${name}" not found. Available: ${Object.keys(SCENARIOS).join(", ")}`,
      );
    }
    this.pets = scenario.pets.map((p) => ({ ...p }));
    this.users = scenario.users.map((u) => ({ ...u }));
    this.orders = scenario.orders.map((o) => ({ ...o }));
    this.nextPetId = Math.max(0, ...this.pets.map((p) => p.id ?? 0)) + 1;
    this.nextUserId = Math.max(0, ...this.users.map((u) => u.id ?? 0)) + 1;
    this.nextOrderId =
      Math.max(0, ...this.orders.map((o) => o.id ?? 0)) + 1;
  }

  /** Returns the names of all available scenarios. */
  get scenarios(): string[] {
    return Object.keys(SCENARIOS);
  }

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

  findPetsByStatus(status: "available" | "pending" | "sold"): Pet[] {
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
