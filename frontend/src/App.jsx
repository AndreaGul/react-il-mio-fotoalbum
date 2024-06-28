
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Administration from "./pages/Administration";
import CreatePhoto from "./pages/CreatePhoto";
import EditPhoto from "./pages/EditPhoto";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import Photos from "./pages/Photos";
import Categories from "./pages/Categories";
import SingleCategory from "./pages/SingleCategory";
import SinglePhoto from "./pages/SinglePhoto";

import { GlobalProvider } from "./contexts/GlobalContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {


  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<DefaultLayout/>}>
                  <Route index element={<HomePage/>}/>
                  <Route path="login" element={<LogIn/>}/>
                  <Route path="signup" element={<SignUp/>}/>
              </Route>

              <Route path="/" element={<DefaultLayout/>}>
                  <Route path="administration" element={<Administration/>} />
                  <Route path="photos">
                    <Route index element={<Photos/>}/>
                    <Route path="create" element={<CreatePhoto/>}/>
                    <Route path=":id" element={<SinglePhoto/>}/>
                    <Route path=":id/edit" element={<EditPhoto/>}/>
                  </Route>
                  
                  <Route path="categories">
                    <Route index element={<Categories/>}/>
                    <Route path="create" element={<CreateCategory/>}/>
                    <Route path=":id" element={<SingleCategory/>}/>
                    <Route path=":id/edit" element={<EditCategory/>}/>
                  </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </>
  )
}

export default App
