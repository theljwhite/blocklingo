import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../managers/auth/useSession";
import { api } from "../../managers/api";
import { UserTypeValue } from "../../managers/user-profile-manager";
import { ROUTE_LOGIN } from "../../constants/routes";
import { REGEX_EMAIL_ADDRESS } from "../../constants/regex";
import LayoutCenter from "../UI/Layouts/LayoutCenter";
import StyledInput from "../UI/StyledInput";
import {
  UserIcon,
  EmailAtIcon,
  ShieldIconOne,
  SvgProjectLogo,
  LabelIcon,
} from "../UI/Icons";
import { toastError, toastSuccess } from "../UI/Toast/Toast";

//TODO - avatar, etc at some point.
//TODO - add actual validation and validation UI to this flow at some point.

type RegisterUser = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
};

export default function Register() {
  const [user, setUser] = useState<RegisterUser>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
  });

  const { dispatch } = useSession();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent): Promise<any> => {
    e.preventDefault();
    validate();
    try {
      const { passwordConfirm, ...rest } = user;

      const response = await api.users.register({
        ...rest,
        userTypeId: UserTypeValue.Player,
        avatar: null,
        walletAddress: null,
        createdAt: new Date(),
        lastLoginDate: null,
        userType: {
          id: UserTypeValue.Player,
          name: UserTypeValue[UserTypeValue.Player],
        },
      });

      if ("error" in response) {
        toastError(response.error, true);
        return;
      }

      dispatch({ type: "login", payload: response });
      toastSuccess(`Success! Welcome, ${user.username}`, true);
      navigate("/");
    } catch (error) {
      toastError("Failed to register. Try again later.");
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    const update = { ...user, [id]: value };

    setUser(update);
  };

  const validate = (): void => {
    if (user.username.length < 4) toastError("Username must be 3+ characters.");
    if (!REGEX_EMAIL_ADDRESS.test(user.email)) {
      toastError("Please enter a valid email.");
    }
    if (user.password.length < 3 || user.passwordConfirm.length < 3) {
      toastError("Password must be at least 3 characters.");
    }
    if (user.password.toLowerCase() !== user.passwordConfirm.toLowerCase()) {
      toastError("Passwords do not match.");
    }
  };

  return (
    <LayoutCenter>
      <div className="text-3xl text-white font-second">
        <div className="relative mx-auto block w-[32rem] rounded-xl border-2 border-zinc-700 py-6 px-4 shadow-lg backdrop-blur-md bg-transparent">
          <form
            onSubmit={handleRegister}
            className="grid grid-cols-1 gap-4 px-6"
          >
            <div className="pb-4 text-center text-white">
              <div className="flex items-center justify-center text-neutral-22 flex-row gap-1">
                <span>
                  <SvgProjectLogo size={30} />
                </span>
                <hr className="border-l border-neutral-14 h-6" />
                <h1 className="text-2xl font-main">Register an account</h1>
              </div>

              <span className="text-zinc-400 text-sm">
                Enter your details to register an account.
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Username <span className="text-primary-1 font-bold">*</span>
              </label>
              <StyledInput
                onChange={onInputChange}
                placeholder="Enter a username"
                stateVar={user.username}
                icon={<UserIcon size={18} color="#FFF" />}
                isDark={false}
                isValid={true}
                type="text"
                id="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Email <span className="text-primary-1 font-bold">*</span>
              </label>
              <StyledInput
                onChange={onInputChange}
                placeholder="Enter email"
                stateVar={user.email}
                icon={<EmailAtIcon size={18} color="#FFF" />}
                isDark={false}
                isValid={true}
                type="text"
                id="email"
              />
            </div>
            <div className="flex gap-4 flex-row items-center justify-center">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Enter password{" "}
                  <span className="text-primary-1 font-bold">*</span>
                </label>
                <StyledInput
                  onChange={onInputChange}
                  placeholder="Enter password"
                  stateVar={user.password}
                  icon={<ShieldIconOne size={18} color="#FFF" />}
                  isDark={false}
                  isValid={true}
                  type="password"
                  id="password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Re-enter password{" "}
                  <span className="text-primary-1 font-bold">*</span>
                </label>
                <StyledInput
                  onChange={onInputChange}
                  placeholder="Re-enter password"
                  stateVar={user.passwordConfirm}
                  icon={<ShieldIconOne size={18} color="#FFF" />}
                  isDark={false}
                  isValid={true}
                  type="password"
                  id="passwordConfirm"
                />
              </div>
            </div>
            <div className="flex gap-4 flex-row items-center justify-center">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  First Name
                </label>
                <StyledInput
                  onChange={onInputChange}
                  placeholder="Enter first name"
                  stateVar={user.firstName}
                  icon={<LabelIcon size={18} color="#FFF" />}
                  isDark={false}
                  isValid={true}
                  type="text"
                  id="firstName"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Last Name
                </label>
                <StyledInput
                  onChange={onInputChange}
                  placeholder="Enter last name"
                  stateVar={user.lastName}
                  icon={<LabelIcon size={18} color="#FFF" />}
                  isDark={false}
                  isValid={true}
                  type="text"
                  id="lastName"
                />
              </div>
            </div>
            <span className="text-zinc-400 my-2 text-xs text-center">
              By creating an account, you are accepting our terms of service and
              privacy policy.
            </span>
            <div className="flex flex-row text-sm my-2 gap-2">
              <button
                onClick={() => navigate(ROUTE_LOGIN)}
                type="button"
                disabled={false}
                className="bg-almostblack text-neutral-22 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:border-gray-400 disabled:text-zinc-500 text-almostblack block mx-auto text-center relative border-neutral-22 border h-[3em] rounded-lg items-center font-bold font-second px-2 w-full"
              >
                Log in instead
              </button>
              <button
                type="submit"
                disabled={false}
                className="bg-primary-1 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:border-gray-400 disabled:text-zinc-500 text-almostblack block mx-auto text-center relative border-blackborder h-[3em] rounded-lg items-center font-bold font-second px-2 w-full"
              >
                Register my account
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutCenter>
  );
}
