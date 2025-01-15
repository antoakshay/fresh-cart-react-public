import { useState } from "react"

function Searchbar() {
    const [query, setQuery] = useState()
    return (
      <form>
        <input
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-2/3 lg:w-1/2"
        />
      </form>
    );
}

export default Searchbar
