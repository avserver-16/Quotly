// -----------------------------
// Types
// -----------------------------
export type Item = {
    title: string;
    subtitle: string;
    date: string;
};

// Safe wrappers
function safeGetRaw(key: string): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
}

function safeSetRaw(key: string, value: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
}

function safeGetArray(key: string): Item[] {
    const raw = safeGetRaw(key);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function safeSetArray(key: string, value: Item[]) {
    safeSetRaw(key, JSON.stringify(value));
}

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
        if (typeof window === "undefined") {
            // running on SSR → delay access
            this.accessGranted = false;
            return;
        }

        const existing = safeGetRaw(this.key);

        try {
            const parsed = existing ? JSON.parse(existing) : [];
            if (!Array.isArray(parsed)) {
                safeSetArray(this.key, []);
            }
        } catch {
            safeSetArray(this.key, []);
        }

        this.accessGranted = true;
    }

    public isAllowed(): boolean {
        return this.accessGranted;
    }
}

// -----------------------------
// MAIN STORAGE MANAGER
// -----------------------------
export class StorageManager {
    private key: string;
    private auth: AuthGuard;

    constructor(key: string) {
        this.key = key;
        this.auth = new AuthGuard(key);
    }

    private getArray(): Item[] {
        if (!this.auth.isAllowed()) return [];
        return safeGetArray(this.key);
    }

    public addItem(title: string, subtitle: string, date: Date) {
        if (!this.auth.isAllowed()) return;

        const arr = this.getArray();
        arr.push({
            title,
            subtitle,
            date: date.toISOString(),
        });

        safeSetArray(this.key, arr);
    }

    public getItems(): Item[] {
        return this.getArray();
    }

    public findItem(title: string, subtitle: string): Item[] {
        return this.getArray().filter(
            (item) => item.title === title && item.subtitle === subtitle
        );
    }

    public removeItem(index: number) {
        const arr = this.getArray();
        arr.splice(index, 1);
        safeSetArray(this.key, arr);
    }

    public clear() {
        safeSetArray(this.key, []);
    }

    public getAll(): Item[] {
        return this.getArray();
    }

    public saveAll(items: Item[]) {
        safeSetArray(this.key, items);
    }
}

// -----------------------------
// OPTIONS SUBCLASS
// -----------------------------
export class Options extends StorageManager {
    constructor() {
        super("Quotly");
    }

    getTitleOptions(): string[] {
        const items = this.getAll();

        const titles = Array.from(new Set(items.map((i) => i.title)));

        return [...titles, "Add new"];
    }
}
