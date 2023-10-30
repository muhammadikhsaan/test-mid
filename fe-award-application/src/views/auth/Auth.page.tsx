import { SessionContext } from "@shared/context/Session.context";
import axios from "axios";
import { FunctionComponent, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface AuthFormType {
  email: string;
}

export const AuthPage: FunctionComponent = () => {
  const {
    register, handleSubmit, formState: { errors }, setError,
  } = useForm<AuthFormType>();

  const navigate = useNavigate();

  const [{ login }, setSession] = useContext(SessionContext);

  useEffect(() => {
    if (login) {
      navigate("/award");
    }
  }, [login]);

  const onSubmit: SubmitHandler<AuthFormType> = async ({ email }) => {
    const { status } = await axios({
      method: "post",
      url: "/api/v1/auth/login",
      data: { email },
    });

    if (status !== 200) {
      setError("email", {
        message: "Email Address is not exists",
      });
    } else {
      setSession({
        login: true,
      });
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center">
      <div className="w-1/3 bg-basic-white flex flex-col justify-center items-center gap-5">
        <h1 className="text-[96px] font-bold m-0 p-0 text-gray-500">Award</h1>
        <p className="text-lg -mt-5">Enter your email address to sign in and contionue</p>

        <form className="flex flex-col w-full items-center gap-3" onSubmit={handleSubmit(onSubmit)}>
          <input className="border border-solid border-gray-300 w-2/3 py-1 px-4 rounded-md" {...register("email", { required: "Email is required" })} placeholder="Email Address" />
          { errors.email && (
            <span className="text-red-200 text-sm -mt-2">
              Email wajib diisi
            </span>
          ) }

          <input className="bg-gray-500 text-basic-white w-1/3 py-2 rounded-md" type="submit" />
        </form>
      </div>
    </div>
  );
};
