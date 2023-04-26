import { saveChart, getChart } from "./chartServices";
import { generateId, /* getStoredTable, */ saveStoredTable } from "./localStorageAPI";

export const getProducts = async () => {
  //const products = await getStoredTable("products");
  return /* products || */ [
    {
       "id":1,
       "title":"Jaleco",
       "description":"Jaleco de alta qualidade fabricado para atender aos clientes mais exigentes",
       "price":60.00,
       "available":true,
       image: "https://picsum.photos/200/200?" + Math.floor(Math.random() * 100)
    },
    {
       "id":2,
       "title":"Avental",
       "description":"Jaleco de alta qualidade fabricado para atender aos clientes mais exigentes",
       "price":30.00,
       "available":true,
       image: "https://picsum.photos/200/200?" + Math.floor(Math.random() * 100)
    },
    {
       "id":3,
       "title":"Touca",
       "description":"Jaleco de alta qualidade fabricado para atender aos clientes mais exigentes",
       "price":10.00,
       "available":true,
       image: "https://picsum.photos/200/200?" + Math.floor(Math.random() * 100)
    },
    {
       "id":4,
       "title":"Fronha",
       "description":"Jaleco de alta qualidade fabricado para atender aos clientes mais exigentes",
       "price":20.00,
       "available":true,
       image: "https://picsum.photos/200/200?" + Math.floor(Math.random() * 100)
    },
    {
       "id":5,
       "title":"Embalagem",
       "description":"Jaleco de alta qualidade fabricado para atender aos clientes mais exigentes",
       "price":1.00,
       "available":true,
       image: "https://picsum.photos/200/200?" + Math.floor(Math.random() * 100)
    },
    {
       "id":6,
       "title":"Porta talher",
       "description":"Jaleco de alta qualidade fabricado para atender aos clientes mais exigentes",
       "price":10.00,
       "available":true,
       image: "https://picsum.photos/200/200?" + Math.floor(Math.random() * 100)
    },
    {
       "id":7,
       "title":"Porta absorvente",
       "description":"Jaleco de alta qualidade fabricado para atender aos clientes mais exigentes",
       "price":20.00,
       "available":true,
       image: "https://picsum.photos/200/200?" + Math.floor(Math.random() * 100)
    }
 ];
};


export const saveProducts = async (products) => {
  await saveStoredTable(products, "products");
};


export const saveProduct = async (productName) => {
  var products = await getProducts();

  const id = generateId(products);

  const newProduct = {
    id: id,
    title: productName,
    image: "https://picsum.photos/200/200?" + Math.floor(Math.random() * 100),
    total: 0,
  };

  products.push(newProduct);
  await saveStoredTable(products, "products");
  return newProduct;
};

export const saveProductInChart = async (product) => {
  const chart = await getChart();
  var prod = chart?.products.find(elem => elem.id === product.id);
  prod ? prod.count++ : (chart && chart.products.push({...product, count:1}));
  await saveChart(chart);
  return chart ? { ...chart } : {};
};


export const deleteProductFromChart = async (product, negativeValue) => {
   const chart = await getChart();
   var prodIndex = chart?.products?.findIndex(elem => elem.id === product.id);
   if(chart?.products?.length && prodIndex != null && prodIndex !== -1){
      chart.products[prodIndex].count > negativeValue ? chart.products[prodIndex].count-=negativeValue : (chart && chart?.products.splice(prodIndex,1));
   }

   await saveChart(chart);
   return chart ? { ...chart } : {};
};