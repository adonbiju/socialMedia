import HomePage from "scenes/HomePage"
import ProfilePage from "scenes/ProfilePage"

export const routes = [
   
    {
        path: '/home',
        component: HomePage
    },
    {
        path: '/profile/:userId',
        component: ProfilePage
    }
]