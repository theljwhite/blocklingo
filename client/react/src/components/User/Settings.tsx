import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../../managers/auth/useSession";
import StyledInput from "../UI/StyledInput";
import LayoutTile from "../UI/Layouts/LayoutTile";
import ProfileHeader from "./SettingsHeader";
import { LabelIcon } from "../UI/Icons";

export default function Settings() {
  const [newName, setNewName] = useState<string>("");
  const { username: userPath } = useParams();

  const { session } = useSession();

  return (
    <LayoutTile>
      <div className="max-w-screen-lg mx-auto px-6 font-second">
        <main className="my-12 lg:mt-16 lg:ml-16 flex-1 block">
          <div className="flex min-h-screen flex-col">
            <ProfileHeader />
            <div className="mt-10">
              <h1 className="text-neutral-22 tracking-tighter text-xl leading-6 lg:leading-7 font-bold lg:text-3xl">
                Settings
              </h1>
            </div>

            <div className="mt-6">
              <form

              // onSubmit={handleSettingsUpdate}
              >
                <div className="grid grid-cols-1 gap-4 my-4">
                  <StyledInput
                    stateVar={""}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Edit username"
                    icon={<LabelIcon size={18} color="#FFF" />}
                    isDark={false}
                    isValid
                    type="text"
                  />
                  <StyledInput
                    stateVar={""}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Edit username"
                    icon={<LabelIcon size={18} color="#FFF" />}
                    isDark={false}
                    isValid
                    type="text"
                  />
                  <StyledInput
                    stateVar={""}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Edit username"
                    icon={<LabelIcon size={18} color="#FFF" />}
                    isDark={false}
                    isValid
                    type="text"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 flex text-white items-center text-left px-4 py-2 rounded-lg bg-zinc-700"
                >
                  Update
                </button>
              </form>
            </div>

            <div className="mt-10">
              <h2 className="text-neutral-22 text-xl tracking-tighter leading-6 lg:leading-7 font-bold lg:text-3xl">
                Danger Zone
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <div className="bg-zinc-800 rounded-lg p-4">
                  <h3 className="text-neutral-22 tracking-tight text-xl leading-6 lg:leading-7 font-bold lg:text-2xl">
                    Delete account
                  </h3>
                  <p className="text-neutral-22">
                    Delete this account. Action cannot be undone.
                  </p>
                  <button className="mt-4 flex text-almostblack items-center text-left px-4 py-2 rounded-lg bg-primary-1 font-bold tracking-tight">
                    Delete my account
                  </button>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <h3 className="text-neutral-22 tracking-tight text-xl leading-6 lg:leading-7 font-bold lg:text-2xl">
                    Withdraw balance
                  </h3>
                  <p className="text-neutral-22">
                    Withdraw your {import.meta.env.VITE_ERC20_TOKEN_SYMBOL}{" "}
                    balance.
                  </p>
                  <button className="mt-4 flex text-almostblack items-center text-left px-4 py-2 rounded-lg bg-primary-1 font-bold tracking-tight">
                    Withdraw my balance
                  </button>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <h3 className="text-white tracking-tight text-xl leading-6 lg:leading-7 font-bold lg:text-2xl">
                    Change email
                  </h3>
                  <p className="text-neutral-22">
                    Change and verify a new email address.
                  </p>
                  <button className="mt-4 flex text-almostblack items-center text-left px-4 py-2 rounded-lg bg-primary-1 font-bold tracking-tight">
                    Manage participants
                  </button>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <h3 className="text-white text-xl leading-6 lg:leading-7 font-bold lg:text-2xl">
                    Custom signup settings
                  </h3>
                  <p className="text-white">Manage signup URL and key.</p>
                  <button className="mt-4 flex text-almostblack items-center text-left px-4 py-2 rounded-lg bg-primary-1 font-bold tracking-tight">
                    Manage participants
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </LayoutTile>
  );
}
