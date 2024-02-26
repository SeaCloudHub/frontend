// paginationsize
export default function PaginationSize() {
  const { paginationSize, setPaginationSize } = usePaginationSize();

  return (
    <div className="pagination-size">
      <span>Rows per page:</span>
      <select
        value={paginationSize}
        onChange={(e) => setPaginationSize(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}
```

```tsx
