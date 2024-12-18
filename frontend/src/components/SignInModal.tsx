import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z
  .object({
    username: z.string().min(3, { message: 'at least 3 characters' }),
    displayName: z.string().min(3, { message: 'at least 3 characters' }),
    password: z.string().min(6, { message: 'at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'at least 6 characters' }),
  })
  .refine(data => data.confirmPassword === data.password, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

const SignInModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className="fixed w-[100vw] h-[100vh] opacity-30 bg-[gray] flex">
      <form onSubmit={handleSubmit(onSubmit)} className=" justify-center items-center flex bg-[#131313]">
        <div>
          <input {...register('username')} placeholder="username" />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <input {...register('displayName')} placeholder="display name" />
          {errors.displayName && <p>{errors.displayName.message}</p>}
        </div>

        <div>
          <input type="password" {...register('password')} placeholder="password" />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <input type="password" {...register('confirmPassword')} placeholder="confirm password" />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">SIGN IN</button>
        <button type="button">SIGN UP</button>
      </form>
    </div>
  )
}
export default SignInModal
