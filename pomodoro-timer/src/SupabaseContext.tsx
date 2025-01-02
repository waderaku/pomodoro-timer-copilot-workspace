import { createContext, useContext, ReactNode } from 'react';
import supabase from './supabaseClient';

const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};
