'use client';
import { useFormState } from 'react-dom';
// import { login } from './actions';

const initialState = { message: '', errors: [] };

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction} className="w-96 mx-auto mt-8">
      <div className="mb-4">
        <label>邮箱</label>
        <input name="email" type="email" className="w-full border p-2 mt-1" />
        {state.errors?.find((e: any) => e.path[0] === 'email') && (
          <p className="text-red-500 text-sm mt-1">{state.errors[0].message}</p>
        )}
      </div>
      <div className="mb-4">
        <label>密码</label>
        <input name="password" type="password" className="w-full border p-2 mt-1" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        登录
      </button>
      {state.message && <p className="mt-2 text-green-500">{state.message}</p>}
    </form>
  );
}