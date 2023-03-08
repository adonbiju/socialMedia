import { lazily } from "react-lazily";

const { HomePage, ProfilePage } = lazily(() => import("./pages"));

export const routes = [
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/profile/:userId",
    component: ProfilePage,
  },
];

