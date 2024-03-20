// import API_BASEURL from "constants";
import axios from "axios";

const API_BASEURL = 'https://expatbackend.onrender.com/api/v1'

export interface RegisterUserProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
}

export interface UserProps {
  id: string,
  token: string,
}

export interface UpdateUserProps {
  id: string
  token: string
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
}

export interface UpdateUser {
  id: string
  token: string
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
}

const registerUser = async (payload: RegisterUserProps) => {
  console.log(payload, "payload")
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(`${API_BASEURL}/users/register`, payload, config);

  return data;
}

const getUsers = async () => {
  // const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };


  const { data } = await axios.get(`${API_BASEURL}/users`, config);
  return data;
}

const getUser = async ({ id, token }: UserProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${API_BASEURL}/users/${id}`, config);
  return data
}





const deleteUser = async ({ id, token }: UserProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.delete(`${API_BASEURL}/users/${id}`, config);
  return data
}

const updateUser = async ({ id,phone, username, email, token }: any) => {
  const data = {
    id,phone, username, email, token
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(`${API_BASEURL}/users/update/${id}`, data , config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again");
  }
}


const reactivateUser = async ({id, token}: UserProps) => {
  const config = {
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_BASEURL}/users/reactivateuser/${id}`, {}, config);
  return response.data
}


const disableUser = async ({id, token}: UserProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_BASEURL}/users/disableuser/${id}`, {}, config);
  return response.data
}


const userService = {
  registerUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
  reactivateUser,
  disableUser,

}

export default userService