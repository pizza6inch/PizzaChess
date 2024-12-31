import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import TitleIcon from "./TitleIcon";
import { Input } from "./ui/input";

import { useDispatch } from "react-redux";
import {
  setShowSignInModal,
  setShowSignUpModal,
} from "@/redux/slices/modalSlice";
import { setUser } from "@/redux/slices/authSlice";

import { signup, getInfo } from "@/serverActions/user";
import { toast } from "react-toastify";

const schema = z
  .object({
    username: z.string().min(3, { message: "at least 3 characters" }),
    displayName: z.string().min(3, { message: "at least 3 characters" }),
    password: z.string().min(6, { message: "at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "at least 6 characters" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const SignUpModal = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // here to sign up
    const { username, displayName, password } = data;
    const response = await signup({ username, displayName, password });

    if (response.success && response.token) {
      toast.success("Sign up success");
      sessionStorage.setItem("accessToken", response.token);
      sessionStorage.removeItem("playerToken");
      window.location.reload();
    } else {
      toast.error(`Sign up failed:${response.error}`);
    }
  };

  const onBackgroundClick = () => {
    dispatch(setShowSignUpModal(false));
  };

  const switchToSignIn = () => {
    dispatch(setShowSignUpModal(false));
    dispatch(setShowSignInModal(true));
  };

  return (
    <>
      <div
        className="fixed z-20 flex h-[100vh] w-[100vw] bg-black opacity-50"
        onClick={onBackgroundClick}
      />
      <div className="fixed left-[50%] top-[50%] z-30 flex w-[90%] translate-x-[-50%] translate-y-[-50%] flex-col items-center bg-[#131313] p-8 md:w-[50%] lg:w-[30%]">
        <div className="mb-8">
          <TitleIcon />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 text-white"
        >
          <div>
            <Input
              {...register("username")}
              placeholder="username"
              className="mb-2 h-[50px]"
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("displayName")}
              placeholder="displayName"
              className="mb-2 h-[50px]"
            />
            {errors.displayName && (
              <p className="text-red-600">{errors.displayName.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              {...register("password")}
              placeholder="password"
              className="mb-2 h-[50px]"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              {...register("confirmPassword")}
              placeholder="confirmPassword"
              className="mb-2 h-[50px]"
            />
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-md bg-red-700 p-2 text-lg font-bold"
          >
            SIGN UP
          </button>
          <button
            type="button"
            className="text-lg font-bold text-red-700"
            onClick={switchToSignIn}
          >
            SIGN IN
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpModal;
