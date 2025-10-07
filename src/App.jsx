import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactosContainer from './components/ContactosContainer';
import AddContact from './components/AddContact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<ContactosContainer />} />
        <Route path={"/contact"} element={<ContactosContainer />} />
        <Route path={"/addcontact"} element={<AddContact />} />
        <Route path={"/addcontact/:id"} element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
