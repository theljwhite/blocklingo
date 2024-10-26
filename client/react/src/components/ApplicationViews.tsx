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
import Settings from "./User/Settings";
import Profile from "./User/Profile";
import LayoutSecond from "./UI/Layouts/LayoutSecond";
import Banner from "./UI/Banner";
import SidebarSleek from "./UI/SidebarSleek";
import NavbarSleek from "./UI/NavbarSleek";
import GameContainerNew from "./Game/GameContainerNew";
import LayoutContentFlex from "./UI/Layouts/LayoutContentFlex";

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
          path={ROUTE_HOW_TO_PLAY}
          element={<span>HOW TO PLAY/HELP</span>}
        />
      </Route>

      <Route path={ROUTE_LOGIN} element={<Login />} />
      <Route path={ROUTE_REGISTER} element={<Register />} />

      <Route
        element={
          <Authorized>
            <LayoutSecond>
              <Banner />
              <SidebarSleek />
              <LayoutContentFlex>
                <NavbarSleek />
                <Outlet />
              </LayoutContentFlex>
            </LayoutSecond>
          </Authorized>
        }
      >
        <Route path={ROUTE_PLAY} element={<GameContainerNew />} />
        <Route path={ROUTE_PROFILE_EXACT} element={<Profile />} />
      </Route>
    </Routes>
  );
}
