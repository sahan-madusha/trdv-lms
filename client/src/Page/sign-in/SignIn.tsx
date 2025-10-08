import React, { useRef, useState } from "react";
import { Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { APPLOGO, IMAGE_URL, LOGIN_SUCCESS, SIGNIN_BG } from "../../Constant";
import { useAuthChecker } from "../../Context";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const SignInPage = () => {
  const passwordRef = useRef(null);
  const loginBtnRef = useRef(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { signIn } = useAuthChecker();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { isLoading: isAuthLoading, refetch } = useQuery({
    queryKey: ["authCheck", formData],
    queryFn: async () => {
      // const res = await AuthCheck(formData);
      // if (res.isAuthDone) {
      //   message.success(res.msg);
      //   signIn(res);
      //   navigate(LOGIN_SUCCESS);
      // } else {
      //   message.error(res.msg);
      // }
      return "done";
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <div className="flex justify-start mb-6">
            <img src={`${IMAGE_URL}/${APPLOGO}`} alt="Logo" className="w-10" />
          </div>

          <h2 className="text-2xl font-semibold text-start mb-2">Sign in</h2>
          <p className="text-gray-500 text-start mb-6 ms-0 text-sm">
            Welcome back! Please enter your details to sign in.
          </p>

          <div className="mb-4">
            <Input
              autoFocus
              size="middle"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              prefix={<UserOutlined />}
              onKeyDown={(e) => {
                if (e.key === "Enter") passwordRef.current?.focus();
              }}
            />
          </div>

          <div className="mb-4">
            <Input.Password
              ref={passwordRef}
              size="middle"
              name="password"
              placeholder="Password"
              prefix={<LockOutlined />}
              onChange={handleChange}
              status={
                formData.password && formData.password.length < 4 ? "error" : ""
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") loginBtnRef.current?.focus();
              }}
            />
            {formData.password && formData.password.length < 4 && (
              <p className="text-red-500 text-end text-xs mt-1">
                Password must be at least 4 characters
              </p>
            )}
          </div>

          <div className="flex justify-end text-xs items-center mb-6">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="primary"
            block
            size="middle"
            ref={loginBtnRef}
            loading={isAuthLoading}
            onClick={() => {
              refetch();
            }}
            disabled={
              formData.password.length < 4 ||
              formData.password == "" ||
              formData.username == ""
            }
          >
            Log in
          </Button>
        </div>
      </div>

      <div
        className="flex-1 hidden lg:block bg-cover bg-center"
        style={{
          backgroundImage: `url('${IMAGE_URL}/${SIGNIN_BG}')`,
        }}
      ></div>
    </div>
  );
};
