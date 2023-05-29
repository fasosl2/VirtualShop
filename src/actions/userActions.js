import {
  authUsersInitType,
  authUsersSuccessType,
  deleteUsersInitType,
  deleteUsersSuccessType,
  fetchUsersInitType,
  fetchUsersSuccessType,
  loginUsersInitType,
  loginUsersSuccessType,
  logoutUsersInitType,
  logoutUsersSuccessType,
  saveUsersInitType,
  saveUsersSuccessType,
} from "../storage/types";
import {
  deleteUser,
  getUsers,
  saveUser,
  userAuth,
  userLogin,
  userLogout,
} from "../services/userServices";
import utilService from "../services/utilService";


export const fetchUsersInitAction = () => ({
  type: fetchUsersInitType,
});

export const fetchUsersSuccessAction = (users) => ({
  type: fetchUsersSuccessType,
  payload: users,
});

export const fetchUsersAction = async (dispatch) => {
  dispatch(fetchUsersInitAction());
  const users = await getUsers();
  dispatch(fetchUsersSuccessAction(users));
};
export const saveUsersInitAction = () => ({
  type: saveUsersInitType,
});

export const saveUsersSuccessAction = (users) => ({
  type: saveUsersSuccessType,
  payload: users,
});

export const saveUsersAction = async (dispatch, userData) => {
  dispatch(saveUsersInitAction());
  await utilService.sleep(500);
  const users = await saveUser(userData);
  dispatch(saveUsersSuccessAction(users));
};

export const deleteUsersInitAction = () => ({
  type: deleteUsersInitType,
});

export const deleteUsersSuccessAction = (users) => ({
  type: deleteUsersSuccessType,
  payload: users,
});

export const deleteUserAction = async (dispatch, user) => {
  dispatch(deleteUsersInitAction());
  await utilService.sleep(1000);
  const users = await deleteUser(user);
  dispatch(deleteUsersSuccessAction(users));
};

export const authUsersInitAction = () => ({
  type: authUsersInitType,
});

export const authUsersSuccessAction = (users) => ({
  type: authUsersSuccessType,
  payload: users,
});

export const authUsersAction = async (dispatch) => {
  dispatch(authUsersInitAction());
  await utilService.sleep(50);
  const users = await userAuth();
  dispatch(authUsersSuccessAction(users));
};

export const loginUsersInitAction = () => ({
  type: loginUsersInitType,
});

export const loginUsersSuccessAction = (users) => ({
  type: loginUsersSuccessType,
  payload: users,
});

export const loginUsersAction = async (dispatch, user) => {
  dispatch(loginUsersInitAction());
  await utilService.sleep(100);
  const users = await userLogin(user);
  dispatch(loginUsersSuccessAction(users));
};

export const logoutUsersInitAction = () => ({
  type: logoutUsersInitType,
});

export const logoutUsersSuccessAction = (users) => ({
  type: logoutUsersSuccessType,
  payload: users,
});

export const logoutUsersAction = async (dispatch) => {
  dispatch(logoutUsersInitAction());
  await utilService.sleep(1000);
  const users = await userLogout();
  dispatch(logoutUsersSuccessAction(users));
};
