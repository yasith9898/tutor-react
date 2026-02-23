import { supabase } from '@/shared/api/supabase';
import { http, HttpResponse, delay } from 'msw';
import type { RegisterFormData } from '../model/schema';

export const handleRegister = async (data: RegisterFormData) => {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
        },
      },
    });

    if (error) {
      console.error("Registration Error Details:", {
        message: error.message,
        status: error.status,
        code: error.name
      });
      throw new Error(error.message);
    }

    return authData;
  } catch (err: any) {
    if (err.message === 'Failed to fetch') {
      throw new Error("Cannot connect to Supabase. Please ensure your project is active and credentials are correct in .env.");
    }
    throw err;
  }
};

/**
 * MSW Handlers for the Register feature.
 * Used in Storybook and Vitest to simulate server responses.
 */
export const handlers = [
  http.post('/api/auth/register', async ({ request }) => {
    // cast json
    const data = (await request.json()) as RegisterFormData;

    // sim network latency
    await delay(800);

    // logic simulation: check for existing users
    if (data?.email === "exists@example.com") {
      return HttpResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // response
    return HttpResponse.json(
      { success: true, user: { name: data.name, email: data.email } },
      { status: 201 }
    );
  }),
];