import { Routes, Route, Outlet } from "react-router-dom";
import {
  ROUTE_LEADERBOARD,
  ROUTE_PLAY,
  ROUTE_HOW_TO_PLAY,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_SETTINGS,
  ROUTE_PROFILE_EXACT,
} from "../constants/routes";
import Authorized from "../managers/auth/Authorized";
import Navbar from "./UI/Navbar";
import Hero from "./UI/Hero";
import Login from "./User/Login";
import Register from "./User/Register";
import GameContainer from "./Game/GameContainer";
import Settings from "./User/Settings";
import Profile from "./User/Profile";

export default function ApplicationViews() {
  return (
    <Routes>
      <Route
        element={
          <>
            <main className="bg-primary-1">
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
              <GameContainer />
            </Authorized>
          }
        />
        <Route path={ROUTE_LEADERBOARD} element={<span>Leaderboard</span>} />
        <Route
          path={ROUTE_SETTINGS}
          element={
            <Authorized>
              <Settings />
            </Authorized>
          }
        />
        <Route
          path={ROUTE_PROFILE_EXACT}
          element={
            <Authorized>
              <Profile />
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
