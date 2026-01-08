// app/login/actions.ts
'use server';
import { z } from 'zod';

// 数据校验
const LoginSchema = z.object({
  email: z.string().email('请输入正确的邮箱'),
  password: z.string().min(6, '密码至少6位'),
});

export async function login(prevState: any, formData: FormData) {
  // 解析表单数据
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // 校验
  const result = LoginSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.issues };
  }

  // 模拟登录逻辑（服务端执行，安全）
  const { email, password } = result.data;
  if (email === 'test@example.com' && password === '123456') {
    return { success: true, message: '登录成功' };
  } else {
    return { success: false, message: '邮箱或密码错误' };
  }
}
