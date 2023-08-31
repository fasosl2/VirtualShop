import { closeModalsType, openModalCreateItemType, 
  openModalCreateProductType, openModalCreateScheduleType, openModalCreateUserType, openModalSaveChartType, 
  openModalSaveItemsType } from "../storage/types";

export const openModalCreateProductAction = (product) => ({
    type: openModalCreateProductType,
    activeProduct: product
  });

export const openModalCreateScheduleAction = (product) => ({
    type: openModalCreateScheduleType,
    activeProduct: product
  });
  
  export const openModalCreateItemAction = (item) => ({
    type: openModalCreateItemType,
    activeItem: item
  });
  
export const openModalSaveItemsAction = (selectedItems) => ({
  type: openModalSaveItemsType,
  selectedItems: selectedItems
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
