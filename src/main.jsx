import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AuthLayout,Login} from './components/index.jsx'
import Home from './pages/Home.jsx';
import AddPost from './pages/AddPost.jsx'
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import Categories from './pages/Categories.jsx'
import SearchResults from './pages/SearchResults.jsx'
import CategoryPage from './pages/CategoryPage.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup/>
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/posts/:slug",
            element: <Post />,
        },
        {
            path: "/Categories",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Categories />
                </AuthLayout>
            ),
        },
        {
            path: "/Categories/:categoryTitle",
            element: <CategoryPage />,
        },
        {
            path :"/search-results-for" ,
            element :<SearchResults />
        }
    ],
},
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider >
   
  </StrictMode>,
)
