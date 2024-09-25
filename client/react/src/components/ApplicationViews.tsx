import { Routes, Route, Outlet } from "react-router-dom";
import {
  ROUTE_LEADERBOARD,
  ROUTE_PLAY,
  ROUTE_HOW_TO_PLAY,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_SETTINGS,
} from "../constants/routes";
import Authorized from "../managers/auth/Authorized";
import Navbar from "./UI/Navbar";
import Hero from "./UI/Hero";
import Login from "./User/Login";
import Register from "./User/Register";
import Play from "./Play/Play";

export default function ApplicationViews() {
  return (
    <Routes>
      <Route
        element={
          <>
            <main
              className="bg-primary-1"
              // style={{ background: "url('./tile_20pc.png')" }}
            >
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <Outlet />
              </div>
            </main>
          </>
        }
      >
        <Route path="/" element={<Hero />} />
        <Route
          path={ROUTE_PLAY}
          element={
            <Authorized>
              <Play />
            </Authorized>
          }
        />
        <Route path={ROUTE_LEADERBOARD} element={<span>Leaderboard</span>} />
        <Route
          path={ROUTE_SETTINGS}
          element={
            <Authorized>
              <span>ACCOUNT SETTINGS</span>
            </Authorized>
          }
        />
        <Route
          path={ROUTE_HOW_TO_PLAY}
          element={<span>HOW TO PLAY/HELP</span>}
        />
      </Route>
      <Route path={ROUTE_LOGIN} element={<Login />} />
      <Route path={ROUTE_REGISTER} element={<Register />} />
    </Routes>
  );
}
