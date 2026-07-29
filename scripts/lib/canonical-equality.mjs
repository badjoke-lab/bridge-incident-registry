function normalize(value) {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort((a, b) => a.localeCompare(b))
        .map((key) => [key, normalize(value[key])])
    );
  }
  return value;
}

export function canonicalString(value) {
  return JSON.stringify(normalize(value));
}

export function canonicalJsonEqual(actual, expected) {
  return canonicalString(actual) === canonicalString(expected);
}

export function firstRecordMismatch(actual, expected) {
  if (!Array.isArray(actual) || !Array.isArray(expected)) {
    return { index: null, id: null, reason: "expected arrays" };
  }
  if (actual.length !== expected.length) {
    return { index: null, id: null, reason: `length ${actual.length} != ${expected.length}` };
  }
  for (let index = 0; index < expected.length; index += 1) {
    if (!canonicalJsonEqual(actual[index], expected[index])) {
      return {
        index,
        id: expected[index]?.id ?? actual[index]?.id ?? null,
        reason: "record content differs"
      };
    }
  }
  return null;
}
