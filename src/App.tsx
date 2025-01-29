import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./page/main/main-page";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<MainPage />} />
            {/* <Route path="two" element={<PageTwo />} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
