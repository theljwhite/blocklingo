import { Navigate, useLocation } from "react-router-dom";

export default function Authorized({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  if (localStorage.getItem("user")) return children;
  else return <Navigate to={`/login`} state={{ from: location }} replace />;
}
