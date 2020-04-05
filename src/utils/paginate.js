export function paginate(items, pageNumber, pageSize) {
  const binf = (pageNumber - 1) * pageSize;
  const newItems = [...items].slice(binf, binf + pageSize);
  return newItems;
}
