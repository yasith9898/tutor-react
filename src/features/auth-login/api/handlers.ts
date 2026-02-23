import { supabase } from '@/shared/api/supabase';
import { type LoginSchema } from '../model/schema';

export const handleLogin = async (data: LoginSchema) => {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error("Login Error Details:", {
        message: error.message,
        status: error.status,
        code: error.name
      });
      throw new Error(error.message);
    }

    return authData;
  } catch (err: any) {
    if (err.message === 'Failed to fetch') {
      throw new Error("Cannot connect to Supabase. Please check your internet connection and VITE_SUPABASE_URL.");
    }
    throw err;
  }
};