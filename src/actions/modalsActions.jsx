import { closeModalsType, openModalCreateCalendarType, openModalCreateItemType,
  openModalCreateProductType, openModalBuyProductType, openModalCreateUserType, openModalCreatePurchaseType, 
  openModalSaveItemsType, openModalCreateCategoriesType } from "../storage/types";

export const openModalCreateProductAction = (product) => ({
    type: openModalCreateProductType,
    activeProduct: product
  });

export const openModalBuyProductAction = (product) => ({
    type: openModalBuyProductType,
    activeProduct: product
  });
  
  export const openModalCreateItemAction = (item) => ({
    type: openModalCreateItemType,
    activeItem: item
  });
  
  export const openModalCreateCalendarAction = (calendar) => ({
    type: openModalCreateCalendarType,
    activeCalendar: calendar
  });
  
export const openModalSaveItemsAction = (selectedItems) => ({
  type: openModalSaveItemsType,
  selectedItems: selectedItems
});
  
export const openModalCreateCategoriesAction = (category) => ({
  type: openModalCreateCategoriesType,
  activeCategory: category
});

export const openModalCreateUserAction = (user) => ({
  type: openModalCreateUserType,
  activeUser: user
});

export const openModalCreatePurchaseAction = (purchase) => ({
  type: openModalCreatePurchaseType,
  activePurchase: purchase
});

export const closeModalsAction = () => ({
  type: closeModalsType,
});
