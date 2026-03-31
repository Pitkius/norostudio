export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function requireString(value: unknown, field: string, opts?: { min?: number; max?: number }) {
  if (typeof value !== "string") throw new HttpError(400, `Field '${field}' must be a string`);
  const trimmed = value.trim();
  if (opts?.min && trimmed.length < opts.min) throw new HttpError(400, `Field '${field}' is too short`);
  if (opts?.max && trimmed.length > opts.max) throw new HttpError(400, `Field '${field}' is too long`);
  return trimmed;
}

export function optionalString(value: unknown, field: string, opts?: { max?: number }) {
  if (value === null || value === undefined || value === "") return undefined;
  const v = requireString(value, field, { min: 0, max: opts?.max });
  return v.length ? v : undefined;
}

export function requireStringArray(value: unknown, field: string, opts?: { maxItems?: number; maxLen?: number }) {
  if (!Array.isArray(value)) throw new HttpError(400, `Field '${field}' must be an array of strings`);
  const arr = value.map((v, i) => requireString(v, `${field}[${i}]`, { min: 1, max: opts?.maxLen ?? 50 }));
  const dedup = Array.from(new Set(arr));
  if (opts?.maxItems && dedup.length > opts.maxItems) {
    throw new HttpError(400, `Field '${field}' has too many items`);
  }
  return dedup;
}

export function requireUrl(value: unknown, field: string) {
  const s = requireString(value, field, { min: 1, max: 2048 });
  try {
    new URL(s);
  } catch {
    throw new HttpError(400, `Field '${field}' must be a valid URL`);
  }
  return s;
}

