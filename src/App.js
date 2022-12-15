import Home from './Home/Home'
import SignUp from './SignUp/SignUp/SignUp'
import NewProduct from './New Product/NewProduct';
import LogIn from './SignUp/Login/LogIn'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpUserData from './SignUp/SignUp/SignUpUserData'


function App() {
  return (
    <BrowserRouter>
    <div className="font-redHat font-normal not-italic">
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/new_product" element={<NewProduct/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/signupdata" element={<SignUpUserData/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
