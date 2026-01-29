import {
    saveCategories,
    getCategories,
  } from "../services/categoriesServices";
  import utilService from "../services/utilService";
  import {
    saveCategoriesInitType,
    saveCategoriesSuccessType,
    fetchCategoriesInitType,
    fetchCategoriesSuccessType,
  } from "../storage/actionConstants";
  
  export const fetchCategoriesInitAction = () => ({
    type: fetchCategoriesInitType,
  });
  
  export const fetchCategoriesSuccessAction = (categories) => ({
    type: fetchCategoriesSuccessType,
    payload: categories,
  });
  
  export const fetchCategoriesAction = async (dispatch, opts) => {
    dispatch(fetchCategoriesInitAction());
    const categories = await getCategories(opts);
    dispatch(fetchCategoriesSuccessAction(categories));
  };
  
  export const saveCategoriesAction = async (dispatch, categoryData) => {
    dispatch({ type: saveCategoriesInitType });
    await utilService.sleep(500);
    const newCategory = await saveCategories(categoryData);
    dispatch({
      type: saveCategoriesSuccessType, payload: newCategory,
    });
  };