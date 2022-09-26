import './App.css';
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import GlobalStyle from './styles/GlobalStyle';
import Login from './Pages/Auth/Login'
import FindId from './Pages/Auth/FindId';
import FindPw from './Pages/Auth/FindPw';
import SignUp1 from './Pages/Auth/SignUp1.jsx'
import SignUp2 from './Pages/Auth/SignUp2.jsx'
import ChangePw from './Pages/Auth/ChangePw';
import Loading from "./Pages/Loading";
import Loading2 from "./Pages/Loading/Loading";
import Complete from "./Pages/Loading/Complete";
import Fail from "./Pages/Loading/Fail";

import EcoMap from "./Pages/Main/EcoMap";
import Home from './Pages/Main/Home'
import Qr from './Pages/Main/Qr'
import MyPage from './Pages/Main/Mypage'
import Notice from './Pages/Main/Notice'

import Exchange from './Pages/Sub/Exchange'
import ServiceInfo from './Pages/Sub/ServiceInfo'
import ServiceCenter from './Pages/Sub/ServiceCenter'
import ServiceIntroduction from './Pages/Sub/ServiceIntroduction'
import MyAsk from './Pages/Sub/MyAsk'
import MyAskDetail from './Pages/Sub/MyAskDetail'
import Complaint from './Pages/Sub/Complaint'
import BrokenDeviceReport from './Pages/Sub/BrokenDeviceReport'
import FrequentlyQuestion from './Pages/Sub/FrequentlyQuestion'

import Alarm from './Pages/Nav/Alarm'
import {AdminMain} from "./Pages/Admin/AdminMain";
import {AdminNotice} from "./Pages/Admin/AdminNotice/AdminNotice";
import {AdminCheckDevice} from "./Pages/Admin/AdminCheckDevice";
import {AdminComplaintManagement} from "./Pages/Admin/AdminComplain/AdminComplaintManagement";
import {AdminBrokenDeviceManagement} from "./Pages/Admin/AdminComplain/AdminBrokenDeviceManagement";
import {AdminUserManagement} from "./Pages/Admin/AdminUserManagement";
import {AdminExchange} from "./Pages/Admin/AdminExchange";
import {AdminNoticeCreate} from "./Pages/Admin/AdminNotice/AdminNoticeCreate";

import AdminLogin from './Pages/Admin/AdminLogin'
import AdminHome from './Pages/Admin/AdminHome'

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* clientMain */}
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/myPage' element={<MyPage/>} />
          <Route exact path='/alarm' element={<Alarm/>} />
          <Route exact path='/map' element={ <EcoMap/>} />
          <Route exact path='/qr' element={<Qr/>} />
          <Route exact path='/notice' element={<Notice/>} />
          <Route exact path='/loading' element={<Loading/>} />
          <Route exact path='/loading2' element={<Loading2/>} />
          <Route exact path='/complete' element={<Complete/>} />
          <Route exact path='/fail' element={<Fail/>} />
          
          <Route exact path='/serviceInfo' element={<ServiceInfo/>} />
          <Route exact path='/serviceCenter' element={<ServiceCenter/>} />
          <Route exact path='/frequentlyQuestion' element={<FrequentlyQuestion />} />
          <Route exact path='/myAsk' element={<MyAsk />} />
          <Route exact path="/myAsk/:id" element={<MyAskDetail/>} />
          <Route exact path='/exchange' element={<Exchange/>} />
          <Route exact path='/complaint' element={<Complaint/>} />
          <Route exact path='/serviceinfo/help' element={<ServiceIntroduction/>} />
          {/* <Route exact path='/brokenDeviceReport' element={<BrokenDeviceReport/>} /> */}
          {/* ClientAuth */}
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/login/findId' element={<FindId/>} />
          <Route exact path='/login/findPw' element={<FindPw/>} />
          <Route exact path='/signup1' element={<SignUp1/>} />
          <Route exact path='/signup2' element={<SignUp2/>} />
          <Route exact path='/login/changePw' element={<ChangePw/>} />
          {/* Admin */}
          <Route exact path='/adminLogin' element={<AdminLogin/>} />
          <Route exact path='/admin' element={<AdminHome/>} />
          {/*<Route exact path='/admin/notice/create' element={<AdminNoticeCreate/>} />*/}
          {/*<Route path='/admin/checkDevice' element={<AdminCheckDevice/>} />*/}
          {/*<Route path='/admin/complaintManagement' element={<AdminComplaintManagement/>} />*/}
          {/*<Route path='/admin/brokenDeviceManagement' element={<AdminBrokenDeviceManagement/>} />*/}
          {/*<Route path='/admin/userManagement' element={<AdminUserManagement/>} />*/}
          {/*<Route path='/admin/exchange' element={<AdminExchange/>} />*/}
        </Routes>
      </Router>
    </>
  );
}

export default App;
