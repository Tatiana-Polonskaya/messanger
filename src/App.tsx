import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./page/main/main-page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<MainPage />} />
          {/* <Route path="two" element={<PageTwo />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
