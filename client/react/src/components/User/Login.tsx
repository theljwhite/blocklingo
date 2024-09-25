import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../managers/auth/useSession";
import { api } from "../../managers/api";
import { REGEX_EMAIL_ADDRESS } from "../../constants/regex";
import LayoutCenter from "../UI/Layouts/LayoutCenter";
import StyledInput from "../UI/StyledInput";
import { SvgProjectLogo, EmailAtIcon, ShieldIconOne } from "../UI/Icons";
import { toastError, toastSuccess } from "../UI/Toast/Toast";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const { dispatch } = useSession();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await api.users.login(email, password);

      if ("error" in user) {
        showCheckCredentials();
        toastError(user.error, true);
        return;
      }

      dispatch({ type: "login", payload: user });
      toastSuccess(`Success! Welcome, ${user.username}`, true);
      navigate("/");
    } catch (error) {
      toastError("Failed to log in. Try again later.", true);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setEmail(value);

    const validEmail = REGEX_EMAIL_ADDRESS.test(value);
    if (validEmail && value.length > 0) setIsEmailValid(true);
    else setIsEmailValid(false);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setPassword(value);

    if (password.length > 2) setIsPasswordValid(true);
    else setIsPasswordValid(false);
  };

  const showCheckCredentials = () => {
    setIsEmailValid(false);
    setIsPasswordValid(false);

    setTimeout(() => {
      setIsEmailValid(true);
      setIsPasswordValid(true);
    }, 3000);
  };

  return (
    <LayoutCenter>
      <div className="text-3xl text-white font-second">
        <div className="relative mx-auto block w-[26rem] rounded-xl border-2 border-zinc-800 p-10 shadow-lg backdrop-blur-md bg-transparent">
          <form onSubmit={handleLogin} className="grid grid-cols-1 gap-4">
            <div className="text-center pb-4 text-white">
              <div className="flex items-center justify-center text-neutral-22 flex-row gap-1">
                <span>
                  <SvgProjectLogo size={30} />
                </span>
                <hr className="border-l border-neutral-14 h-6" />
                <h1 className="text-2xl font-main">
                  {import.meta.env.VITE_PROJECT_NAME}
                </h1>
              </div>
              <div className="text-center text-almostblack"></div>
              <span className="text-zinc-400 text-sm">
                Enter your details to login.
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Email
              </label>
              <StyledInput
                onChange={onEmailChange}
                placeholder="Enter email"
                stateVar={email}
                icon={<EmailAtIcon size={18} color="#FFF" />}
                isDark={false}
                isValid={isEmailValid}
                type="text"
                id="login-email-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Password
              </label>
              <StyledInput
                onChange={onPasswordChange}
                placeholder="Enter password"
                stateVar={password}
                icon={<ShieldIconOne size={18} color="#FFF" />}
                isDark={false}
                isValid={isPasswordValid}
                type="password"
                id="login-password-input"
              />
            </div>
            <div className="flex flex-col text-sm my-2 gap-2">
              <button
                type="submit"
                disabled={!isEmailValid || !isPasswordValid}
                className="bg-primary-1 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:border-gray-400 disabled:text-zinc-500 text-almostblack block mx-auto text-center relative border-blackborder h-[3em] rounded-lg items-center font-bold font-second px-2 w-full"
              >
                Log in to {import.meta.env.VITE_PROJECT_NAME}
              </button>
            </div>
          </form>
          <Link
            to="/register"
            className="absolute text-xs hover:underline hover:opacity-75 left-0 right-0 -bottom-12 text-center text-white"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </LayoutCenter>
  );
}
