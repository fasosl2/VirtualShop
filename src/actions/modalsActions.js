import { closeModalsType, openModalCreateItemType, openModalCreateProductType, openModalCreateUserType, openModalSaveChartType, openModalSaveProductType } from "../storage/types";

export const openModalCreateProductAction = (product) => ({
    type: openModalCreateProductType,
    activeProduct: product
  });
  
  export const openModalCreateItemAction = (item) => ({
    type: openModalCreateItemType,
    activeItem: item
  });
  
export const openModalSaveProductAction = (productId) => ({
  type: openModalSaveProductType,
  payload: productId,
});
  
export const openModalCreateUserAction = (user) => ({
  type: openModalCreateUserType,
  activeUser: user
});

export const openModalSaveChartAction = () => ({
  type: openModalSaveChartType,
});

export const closeModalsAction = () => ({
  type: closeModalsType,
});
