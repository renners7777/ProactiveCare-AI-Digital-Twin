import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Basic auth functionality - expand this later
  const signIn = async () => {
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    signIn,
    signOut
  };
}