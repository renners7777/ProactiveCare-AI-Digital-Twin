import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

// Mock the supabase module
vi.mock('../lib/supabase');

const TestComponent = () => {
  const { user, signIn, signUp, signOut } = useAuth();
  return (
    <div>
      {user ? (
        <>
          <span>Logged in as {user.email}</span>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <button onClick={() => signIn('test@example.com', 'password')}>
            Sign In
          </button>
          <button onClick={() => signUp('test@example.com', 'password', 'carer')}>
            Sign Up
          </button>
        </>
      )}
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides authentication state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles sign in successfully', async () => {
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
    };

    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: mockUser },
      error: null,
    });

    vi.mocked(supabase.from).mockReturnValueOnce({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({
            data: [{ id: mockUser.id, email: mockUser.email, role: 'carer' }],
            error: null,
          }),
        }),
      }),
    } as any);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(signInButton);
    
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument();
    });
  });

  it('handles sign in error', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: null },
      error: new Error('Invalid login credentials'),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(signInButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });

  it('handles sign up successfully', async () => {
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
    };

    vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
      data: { user: mockUser },
      error: null,
    });

    vi.mocked(supabase.from).mockReturnValueOnce({
      upsert: vi.fn().mockResolvedValue({
        error: null,
      }),
    } as any);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(signUpButton);
    
    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
        options: {
          data: { role: 'carer' },
          emailRedirectTo: expect.any(String),
        },
      });
    });
  });

  it('handles sign out', async () => {
    // Mock initial authenticated state
    vi.mocked(supabase.auth.getSession).mockResolvedValueOnce({
      data: {
        session: {
          user: { id: 'test-user-id', email: 'test@example.com' },
        },
      },
      error: null,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/logged in as/i)).toBeInTheDocument();
    });

    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    await userEvent.click(signOutButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });
});