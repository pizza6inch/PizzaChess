import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import TitleIcon from './TitleIcon'
import { Input } from './ui/input'

import { useDispatch } from 'react-redux'
import { setShowSignInModal, setShowSignUpModal } from '@/redux/slices/modalSlice'
import { setUser } from '@/redux/slices/authSlice'
import { login, getInfo } from '@/app/serverActions/user'

import { toast } from 'react-toastify'

const schema = z.object({
  username: z.string().min(3, { message: 'at least 3 characters' }),
  password: z.string().min(6, { message: 'at least 6 characters' }),
})

type FormData = z.infer<typeof schema>

const SignInModal = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    // here to sign in
    const { username, password } = data
    const response = await login({ username, password })

    if (response.success && response.token) {
      toast.success('Login success')
      localStorage.setItem('accessToken', response.token)
      dispatch(setShowSignInModal(false))

      const infoResponse = await getInfo(response.token)
      if (infoResponse.success && infoResponse.user) {
        dispatch(setUser(infoResponse.user))
      }
    } else {
      toast.error('Login failed')
    }
  }

  const onBackgroundClick = () => {
    dispatch(setShowSignInModal(false))
  }

  const switchToSignUp = () => {
    dispatch(setShowSignInModal(false))
    dispatch(setShowSignUpModal(true))
  }

  return (
    <>
      <div className="fixed w-[100vw] h-[100vh] opacity-50 bg-black flex z-20" onClick={onBackgroundClick} />
      <div className="fixed md:w-[50%] lg:w-[30%] w-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#131313] flex flex-col items-center p-8 z-30">
        <div className=" mb-8">
          <TitleIcon />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-white w-full">
          <div>
            <Input {...register('username')} placeholder="username" className=" h-[50px] mb-2" />
            {errors.username && <p className=" text-red-600">{errors.username.message}</p>}
          </div>

          <div>
            <Input type="password" {...register('password')} placeholder="password" className=" h-[50px] mb-2" />
            {errors.password && <p className=" text-red-600">{errors.password.message}</p>}
          </div>

          <button type="submit" className=" bg-red-700 p-2 text-lg rounded-md font-bold">
            SIGN IN
          </button>
          <button type="button" className=" text-red-700 text-lg font-bold" onClick={switchToSignUp}>
            SIGN UP
          </button>
        </form>
      </div>
    </>
  )
}

export default SignInModal