import Header from "./page/Header";
import MainContent from "./page/MainContent";
import SignIn from "./page/SignIn"; 
import {Routes,Route} from 'react-router-dom';
import SignUp from "./page/SignUp";
import Dashboard from "./page/Dashboard";
function App() {
  return <>
    <Routes><Route path="/" element={<Header/>}></Route></Routes>
    <Routes><Route path="/" element={<MainContent/>}></Route></Routes>
    <Routes><Route path="/SignIn" element={<SignIn/>}></Route></Routes>
    <Routes><Route path="/SignUp" element={<SignUp/>}></Route></Routes>
    <Routes><Route path="/Dashboard" element={<Dashboard/>}></Route></Routes>
  </>
}
export default App;
