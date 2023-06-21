import { HomePage } from "./pages/Home";
import { Products } from "./pages/Products";
import { Users } from "./pages/Users";
import { ChartPage } from "./pages/ChartPage/ChartPage";
import { HeaderPartial } from "./partials/HeaderPartial";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./storage/AppContext";
import { Items } from "./pages/Items";
import { GlobalStyle } from "./styles/global";

const initialState = {
  activeProduct: null,
  activeUser: null,
  activeItem: null,
  selectedItems: [],
  mode: null,
  chart: {
    products: []
  },
  type: null,
  products: [],
  users: [],
  items: [],
  currentUser: null,
};

function App() {
  return (
    
    <BrowserRouter>
      <div className="App">
        <AppContext initialState={initialState}>
          <GlobalStyle />
          <HeaderPartial />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/itens" element={<Items />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </AppContext>
      </div>
    </BrowserRouter>
  );
}

export default App;
