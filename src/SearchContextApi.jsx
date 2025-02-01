import { createContext, useContext, useEffect, useRef, useState } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export function SearchContextProvider({ children }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  // !! Setting the signUp Auth state in memory localstorage
  const [signUpAuth, setSignUpAuth] = useState(() => {
    const savedAuth = localStorage.getItem('signUpAuth');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  // !! Setting the resetPass Auth state in memory localstorage
  const [resetPassAuth, setResetPassAuth] = useState(() => {
    const savedAuth = localStorage.getItem('resetPassAuth');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });
  const [pageQuery, setPageQuery] = useState(1);

  // !! Setting the signUp Auth state in memory localstorage
  useEffect(() => {
    localStorage.setItem('signUpAuth', JSON.stringify(signUpAuth));
  }, [signUpAuth]);

  // !! Setting the resetPass Auth state in memory localstorage
  useEffect(() => {
    localStorage.setItem('resetPassAuth', JSON.stringify(resetPassAuth));
  }, [resetPassAuth]);

  const [updateQtyLoading, setUpdateQtyLoading] = useState({});
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
        resetPassAuth,
        setResetPassAuth,
        updateQtyLoading,
        setUpdateQtyLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
