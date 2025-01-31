import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./page/main/main-page";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ConfigProvider } from "antd";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorText: "black",
              //   colorPrimary: "rgb(86, 109, 136)",
              itemSelectedBg: "rgba(129, 166, 209, 0.26)",
              itemBg:"",
              itemBorderRadius: 0,
              itemMarginInline: 0,
              itemMarginBlock: 0,
            },
          },
          token: {
            // Seed Token
            colorText: "gray",
            colorPrimary: "rgb(129, 166, 209)",
            borderRadius: 5,

            // Alias Token
            // colorBgContainer: "#e3e3e3",
          },
        }}
      >
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<MainPage />} />
              {/* <Route path="two" element={<PageTwo />} /> */}
            </Routes>
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    </>
  );
}

export default App;
