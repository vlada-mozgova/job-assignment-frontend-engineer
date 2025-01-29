import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "redux/store";
import { loginUser, selectIsLoggedIn } from "redux/userSlice";
import { useNavigate } from "react-router-dom";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { User } from "modules/user/Profile";

const validationSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").min(1, "Password is required"),
});

export type FormValues = {
  email: string;
  password: string;
};

const formFields = [
  { name: "email", type: "text", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Password" },
];

const Login: React.FC = () => {
  const dispatch = useAppDispatch() as (action: AsyncThunkAction<User, FormValues, any>) => Promise<User>;
  const userToken: string | undefined = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [userToken]);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            <ul className="error-messages">
              {errors.email && <li>{errors.email.message}</li>}
              {errors.password && <li>{errors.password.message}</li>}
            </ul>

            <form onSubmit={handleSubmit(onSubmit)}>
              {formFields.map(field => (
                <fieldset className="form-group" key={field.name}>
                  <input
                    className="form-control form-control-lg"
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name as keyof FormValues)}
                  />
                </fieldset>
              ))}
              <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
