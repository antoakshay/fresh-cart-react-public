import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export function SearchContextProvider({ children }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpAuth, setSignUpAuth] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        loading,
        setLoading,
        signUpAuth,
        setSignUpAuth,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
