import { createContext, useContext, useEffect, useRef, useState } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export function SearchContextProvider({ children }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  // !! Setting the signUp Auth state in memory localstorage
  const [signUpAuth, setSignUpAuth] = useState(() => {
    const savedAuth = localStorage.getItem('signUpAuth');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });
  const [pageQuery, setPageQuery] = useState(1);

  // !! Setting the signUp Auth state in memory localstorage
  useEffect(() => {
    localStorage.setItem('signUpAuth', JSON.stringify(signUpAuth));
  }, [signUpAuth]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        loading,
        setLoading,
        signUpAuth,
        setSignUpAuth,
        pageQuery,
        setPageQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
