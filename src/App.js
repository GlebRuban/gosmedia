
import MainContent from "./page/MainContent";
import SignIn from "./page/SignIn"; 
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignUp from "./page/SignUp";
import Dashboard from "./page/Dashboard";
import Header from "./page/Header";
import { Container } from "@mui/material";
import DownloadVideo from "./page/DownloadVideo";
import DownloadPost from "./page/DownloadPost";


function App() {
  return <>
    <Routes>
      <Route path="/" element={<CommonLayout><MainContent/></CommonLayout>}></Route>
      <Route path="/sign-in" element={<SignIn/>}></Route>
      <Route path="/sign-up" element={<SignUp/>}></Route>
      <Route path="/video" element={<DownloadVideo/>}></Route>
      <Route path="/post" element={<DownloadPost/>}></Route>
      <Route path="/user/:username" element={<CommonLayout><Dashboard/></CommonLayout>}></Route>
    </Routes>
  </>
}
export default App;


function CommonLayout(props) {
  return <>
      <Header/>
      <Container maxWidth="xl">
        { props.children }
      </Container>
  </>
}
