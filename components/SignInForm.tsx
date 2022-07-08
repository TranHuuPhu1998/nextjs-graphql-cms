import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function SignInForm({ csrfToken }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      csrfToken,
    },
  });
  const [loading] = useState(false);

  return (
    <form method="post" action="/api/auth/callback/credentials" className="space-y-6">
      <input type="hidden" {...register('csrfToken')} />

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1">
          <input
            {...register('email' as any, { required: true })}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {(errors as any).email && <span className="mt-2 inline-block text-sm text-red-500">This field is required</span>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            {...register('password' as any, { required: true })}
            id="password"
            name="password"
            type="password"
            autoComplete="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {(errors as any).password && <span className="mt-2 inline-block text-sm text-red-500">This field is required</span>}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
