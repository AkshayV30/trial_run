export function getPirate(id) {
  const pirates = [
    { id: 1, name: "Pirate One", active: "1956-1999", country: "Germany" },
    { id: 2, name: "Pirate Two", active: "1999-2000", country: "Austria" },
    { id: 3, name: "Pirate Three", active: "2000-2100", country: "Nepal" },
  ];
  return pirates.find((p) => p.id === id);
  // Find and return the pirate object with the matching ID
}
