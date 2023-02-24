import { HomePage,ProfilePage} from "pages"

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