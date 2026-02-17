import React from "react";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", { ...props }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
    React.createElement("a", { href, ...rest }, children),
}));

// Avoid jsdom "Not implemented" errors for media methods.
Object.defineProperty(globalThis.HTMLMediaElement.prototype, "play", {
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined),
});
Object.defineProperty(globalThis.HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value: vi.fn(),
});
Object.defineProperty(globalThis.HTMLMediaElement.prototype, "load", {
  configurable: true,
  value: vi.fn(),
});

// Provide a lightweight Supabase mock to avoid env requirements in unit tests.
vi.mock("@/lib/SupabaseClient", () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
      delete: vi.fn().mockResolvedValue({ error: null }),
      eq: vi.fn().mockResolvedValue({ data: [], error: null }),
      insert: vi.fn().mockResolvedValue({ error: null }),
    })),
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({ error: null }),
        remove: vi.fn().mockResolvedValue({ error: null }),
        getPublicUrl: vi.fn(() => ({ data: { publicUrl: "" } })),
      })),
    },
  },
}));
