import { afterEach, describe, expect, it, vi } from "vitest";

describe("getSupabase", () => {
  afterEach(() => {
    vi.doUnmock("@supabase/supabase-js");
    vi.resetModules();
  });

  it("cria o cliente uma vez só", async () => {
    const createClient = vi.fn(() => ({}));
    vi.doMock("@supabase/supabase-js", () => ({ createClient }));
    const { getSupabase } = await import("./supabase");

    expect(await getSupabase()).toBe(await getSupabase());
    expect(createClient).toHaveBeenCalledOnce();
  });

  it("tenta de novo depois de uma falha", async () => {
    const createClient = vi
      .fn()
      .mockImplementationOnce(() => {
        throw new Error("falhou");
      })
      .mockReturnValue({});
    vi.doMock("@supabase/supabase-js", () => ({ createClient }));
    const { getSupabase } = await import("./supabase");

    await expect(getSupabase()).rejects.toThrow("falhou");
    await expect(getSupabase()).resolves.toEqual({});
  });
});
