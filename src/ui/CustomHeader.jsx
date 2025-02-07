function CustomHeader({ category }) {
return (
  <div className="w-full rounded-lg border border-gray-700 bg-black p-4 shadow-md transition-all hover:bg-gray-900 hover:shadow-lg">
    <div className="mb-2 text-xl font-semibold text-white">{category}</div>
    <p className="text-sm text-gray-400">
      Select this category to explore the available products within it.
    </p>
  </div>
);

}

export default CustomHeader;
