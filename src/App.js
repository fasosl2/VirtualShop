import { HomePage } from "./pages/Home";
import { Products } from "./pages/Products";
import { Users } from "./pages/Users";
import { ChartPage } from "./pages/ChartPage";
import { HeaderPartial } from "./partials/HeaderPartial";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./storage/AppContext";
import { Items } from "./pages/Items";
import { Purchases } from "./pages/Purchases";
import { GlobalStyle } from "./styles/global";
import { FooterPartial } from "./partials/FooterPartial";
import { AboutPage } from "./pages/About";

const initialState = {
  activeProduct: null,
  activeUser: null,
  activeItem: null,
  selectedItems: [],
  purchases: [],
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/itens" element={<Items />} />
            <Route path="/pedidos" element={<Purchases />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
          <FooterPartial />
        </AppContext>
      </div>
    </BrowserRouter>
  );
}

export default App;
