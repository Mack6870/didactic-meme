// In-memory store — swap this out for a real database client later.
// Each service method mirrors a typical CRUD operation.

let items = [
  { id: '1', name: 'Example Item 1', description: 'This is a placeholder' },
  { id: '2', name: 'Example Item 2', description: 'Replace with real data' },
];

let nextId = 3;

exports.findAll = async () => {
  return items;
};

exports.findById = async (id) => {
  return items.find((item) => item.id === id) || null;
};

exports.create = async (data) => {
  const item = { id: String(nextId++), ...data };
  items.push(item);
  return item;
};

exports.update = async (id, data) => {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...data, id };
  return items[index];
};

exports.remove = async (id) => {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [removed] = items.splice(index, 1);
  return removed;
};
