import * as ls from "local-storage";

// -----------------------------
// Types
// -----------------------------
export type Item = {
  title: string;
  subtitle: string;
  date: string;
};

// -----------------------------
// Authentication / Access Guard
// -----------------------------
export class AuthGuard {
  private key: string;
  public accessGranted: boolean = false;

  constructor(key: string) {
    this.key = key;
    this.initialize();
  }

  private initialize() {
    const existing = ls.get(this.key);

    // If not an array -> initialize it
    if (!Array.isArray(existing)) {
      ls.set(this.key, []);
      this.accessGranted = true;
    } else {
      this.accessGranted = true;
    }
  }

  public isAllowed(): boolean {
    return this.accessGranted;
  }
}

// -----------------------------
// Main Storage Manager Class
// -----------------------------
export class StorageManager {
  private key: string;
  private auth: AuthGuard;

  constructor(key: string) {
    this.key = key;
    this.auth = new AuthGuard(key);

    if (!this.auth.isAllowed()) {
      throw new Error("Storage access denied by AuthGuard.");
    }
  }

  // Helper: safe array getter
  private getArray(): Item[] {
    const data = ls.get(this.key);
    return Array.isArray(data) ? data : [];
  }

  // Create / Add Item
  public addItem(title: string, subtitle: string, date: Date) {
    if (!this.auth.isAllowed()) return;

    const newItem: Item = {
      title,
      subtitle,
      date: date.toISOString(),
    };

    const arr = this.getArray();
    arr.push(newItem);

    ls.set(this.key, arr);
  }

  // Read All
  public getItems(): Item[] {
    if (!this.auth.isAllowed()) return [];
    return this.getArray();
  }

  // Filter / Find Item
  public findItem(title: string, subtitle: string): Item[] {
    if (!this.auth.isAllowed()) return [];
    return this.getArray().filter(
      (item) => item.title === title && item.subtitle === subtitle
    );
  }

  // Optional: Delete by Index
  public removeItem(index: number) {
    if (!this.auth.isAllowed()) return;

    const arr = this.getArray();
    arr.splice(index, 1);
    ls.set(this.key, arr);
  }

  // Optional: Clear Storage
  public clear() {
    if (!this.auth.isAllowed()) return;
    ls.set(this.key, []);
  }
}
