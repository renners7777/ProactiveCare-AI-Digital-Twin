import { vi } from 'vitest';
import { User } from '@supabase/supabase-js';

const mockUser: User = {
  id: 'test-user-id',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: '2025-01-01T00:00:00.000Z',
};

export const supabase = {
  auth: {
    getSession: vi.fn().mockResolvedValue({
      data: { session: { user: mockUser } },
      error: null,
    }),
    signInWithPassword: vi.fn().mockResolvedValue({
      data: { user: mockUser },
      error: null,
    }),
    signUp: vi.fn().mockResolvedValue({
      data: { user: mockUser },
      error: null,
    }),
    signOut: vi.fn().mockResolvedValue({
      error: null,
    }),
    resetPasswordForEmail: vi.fn().mockResolvedValue({
      error: null,
    }),
    updateUser: vi.fn().mockResolvedValue({
      data: { user: mockUser },
      error: null,
    }),
    onAuthStateChange: vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    }),
  },
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        limit: vi.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      }),
    }),
    upsert: vi.fn().mockResolvedValue({
      error: null,
    }),
  }),
};