import { HomePage } from "./pages/Home/HomePage";
import { Products } from "./pages/Products";
import { ChartPage } from "./pages/ChartPage/ChartPage";
import { HeaderPartial } from "./partials/HeaderPartial/Headerpartial";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./storage/AppContext";

const initialState = {
  activeProductId: null,
  mode: null,
  chart: {
    products: []
  },
  type: null,
  products: []
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppContext initialState={initialState}>
          <HeaderPartial />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </AppContext>
      </div>
    </BrowserRouter>
  );
}

export default App;
