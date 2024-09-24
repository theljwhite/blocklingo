import { useSession } from "../../managers/auth/useSession";

//TODO

export default function Play() {
  const { session } = useSession();

  return <div>Welcome, {session?.user?.username};</div>;
}
