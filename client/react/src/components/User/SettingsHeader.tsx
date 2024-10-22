import { useSession } from "../../managers/auth/useSession";
import { LabelIcon } from "../UI/Icons";

export default function SettingsHeader() {
  const { session } = useSession();

  return (
    <div
      className="p-6 rounded-lg shadow"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(39, 39, 42, 0.99) 30%, rgba(39, 39, 42, 0.75) 70%, rgba(39, 39, 42, 0) 100%), url('/tile_20pc.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
      }}
    >
      <div className="flex items-center space-x-4">
        <img
          className="w-10 h-10 rounded-lg object-cover"
          src="/tile_busy.png"
        />
        <h1 className="text-white tracking-tight text-lg lg:text-3xl leading-8 lg:leading-9 font-bold">
          {session?.user?.username}
        </h1>
      </div>
      <p className="mt-3 opacity-80 text-sm lg:text-base text-white">Desc</p>
      <div className="flex flex-wrap mt-4">
        <span className="mr-6 text-white inline-block h-[1em] flex flex-row justify-center items-center align-[-0.125em]">
          <span className="mr-1">
            <LabelIcon size={16} />
          </span>
          here
        </span>
        <span className="mr-6 text-white inline-block h-[1em] flex flex-row justify-center items-center align-[-0.125em]">
          <span className="mr-1">
            <LabelIcon size={16} />
          </span>
          Here again
        </span>
        <span className="mr-6 capitalize text-white inline-block h-[1em] flex flex-row justify-center items-center align-[-0.125em]">
          <span className="mr-1">
            <LabelIcon size={16} />
          </span>
          here again
        </span>

        <span className="mr-6 text-white inline-block h-[1em] flex flex-row justify-center items-center align-[-0.125em]">
          <span className="mr-1">
            <LabelIcon color="currentColor" size={16} />
          </span>
          Date?
        </span>
      </div>
    </div>
  );
}
