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
} from "../storage/actionConstants";
import {
  deleteUser,
  getUsers,
  saveUser,
  userAuth,
  userLogin,
  userLogout,
} from "../services/userServices";
import utilService from "../services/utilService";
import React from "react";
import type { ILoginData, IUser, IUserToken } from "../interfaces/User";
import type { IPaginatedResponse } from "../interfaces/Response";

interface Action {
  type: string;
  payload?: any;
}

export const fetchUsersInitAction = () => ({
  type: fetchUsersInitType,
});

export const fetchUsersSuccessAction = (users: IPaginatedResponse<IUser>) => ({
  type: fetchUsersSuccessType,
  payload: users,
});

export const fetchUsersAction = async (
  dispatch: React.Dispatch<Action>,
  opts?: any
) => {
  dispatch(fetchUsersInitAction());
  const users = await getUsers(opts);
  dispatch(fetchUsersSuccessAction(users));
};
export const saveUsersInitAction = () => ({
  type: saveUsersInitType,
});

export const saveUsersSuccessAction = (users: IPaginatedResponse<IUser>) => ({
  type: saveUsersSuccessType,
  payload: users,
});

export const saveUsersAction = async (
  dispatch: React.Dispatch<Action>,
  userData: IUser
) => {
  dispatch(saveUsersInitAction());
  await utilService.sleep(500);
  const users = await saveUser(userData);
  dispatch(saveUsersSuccessAction(users));
};

export const deleteUsersInitAction = () => ({
  type: deleteUsersInitType,
});

export const deleteUsersSuccessAction = (users: IPaginatedResponse<IUser>) => ({
  type: deleteUsersSuccessType,
  payload: users,
});

export const deleteUserAction = async (
  dispatch: React.Dispatch<Action>,
  userId: string
) => {
  dispatch(deleteUsersInitAction());
  await utilService.sleep(1000);
  const users = await deleteUser(userId);
  dispatch(deleteUsersSuccessAction(users));
};

export const authUsersInitAction = () => ({
  type: authUsersInitType,
});

export const authUsersSuccessAction = (user: IUserToken) => ({
  type: authUsersSuccessType,
  payload: user,
});

export const authUsersAction = async (dispatch: React.Dispatch<Action>) => {
  dispatch(authUsersInitAction());
  await utilService.sleep(50);
  const user = await userAuth();
  dispatch(authUsersSuccessAction(user));
};

export const loginUsersInitAction = () => ({
  type: loginUsersInitType,
});

export const loginUsersSuccessAction = (user: IUser  | {error: string}) => ({
  type: loginUsersSuccessType,
  payload: user,
});

export const loginUsersAction = async (
  dispatch: React.Dispatch<Action>,
  user: ILoginData
) => {
  dispatch(loginUsersInitAction());
  await utilService.sleep(100);
  const returnedUser = await userLogin(user);
  dispatch(loginUsersSuccessAction(returnedUser));
};

export const logoutUsersInitAction = () => ({
  type: logoutUsersInitType,
});

export const logoutUsersSuccessAction = () => ({
  type: logoutUsersSuccessType,
});

export const logoutUsersAction = async (dispatch: React.Dispatch<Action>) => {
  dispatch(logoutUsersInitAction());
  await utilService.sleep(1000);
  await userLogout();
  dispatch(logoutUsersSuccessAction());
};
