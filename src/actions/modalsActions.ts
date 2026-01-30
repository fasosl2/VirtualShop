import {
  closeModalsType,
  openModalCreateCalendarType,
  openModalCreateItemType,
  openModalCreateProductType,
  openModalBuyProductType,
  openModalCreateUserType,
  openModalCreatePurchaseType,
  openModalSaveItemsType,
  openModalCreateCategoriesType,
} from "../storage/actionConstants";
import type { IProduct } from "../interfaces/Product";
import type { Item, SelectedItem } from "../interfaces/Item";
import type { ICategory } from "../interfaces/Category";
import type { IUser } from "../interfaces/User";
import type { IPurchase } from "../interfaces/Purchase";

export const openModalCreateProductAction = (product: IProduct | null) => ({
  type: openModalCreateProductType,
  activeProduct: product,
});

export const openModalBuyProductAction = (product: IProduct | null) => ({
  type: openModalBuyProductType,
  activeProduct: product,
});

export const openModalCreateItemAction = (item: Item | null) => ({
  type: openModalCreateItemType,
  activeItem: item,
});

export const openModalCreateCalendarAction = (calendar) => ({
  type: openModalCreateCalendarType,
  activeCalendar: calendar,
});

export const openModalSaveItemsAction = (selectedItems: SelectedItem[]) => ({
  type: openModalSaveItemsType,
  selectedItems: selectedItems,
});

export const openModalCreateCategoriesAction = (category: ICategory | null) => ({
  type: openModalCreateCategoriesType,
  activeCategory: category,
});

export const openModalCreateUserAction = (user: IUser | null) => ({
  type: openModalCreateUserType,
  activeUser: user,
});

export const openModalCreatePurchaseAction = (purchase: IPurchase | null) => ({
  type: openModalCreatePurchaseType,
  activePurchase: purchase,
});

export const closeModalsAction = () => ({
  type: closeModalsType,
});
