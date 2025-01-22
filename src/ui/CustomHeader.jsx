function CustomHeader({ category }) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all hover:bg-gray-100 hover:shadow-lg">
      <div className="mb-2 text-xl font-semibold">{category}</div>
      <p className="text-sm text-gray-500">
        Select this category to explore the available products within it.
      </p>
    </div>
  );
}

export default CustomHeader;
