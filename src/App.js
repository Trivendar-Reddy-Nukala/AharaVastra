import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './components/Nopage';
import About from './components/About';
import Home from './components/Home';
import Donarlogin from './components/Donarlogin';
import Donarregistration from './components/Donarregistration';
import Charitylogin from './components/Charitylogin';
import Charityregistration from './components/Charityregistration';
import  Donationform from './components/Donationform';
import DonationData from './components/DonationData';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/donationform" element={<Donationform />} />
          <Route path="/donarlogin" element={<Donarlogin />} />
          <Route path="/donarregistration" element={<Donarregistration />} />
          <Route path="/charitylogin" element={<Charitylogin />} />
          <Route path="/charityregistration" element={<Charityregistration />} />
          <Route path="/donationdata" element={<DonationData />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
