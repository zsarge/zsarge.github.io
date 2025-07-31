
const myMap = new Map();

export function getState(domain: string) {
  return myMap.get(domain) ?? 0;
}

export function incrementAndGet(domain: string) {
  const value = myMap.get(domain) ?? 0;
  myMap.set(domain, value + 1);
  return value;
}

