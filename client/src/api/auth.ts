import axios from "axios"

export const login = async (data: {email: string, password: string}) => {
  const res = await axios.post('http://localhost:5000/auth/login', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return res;
}

export const register = async (data: {name: string, email: string, password: string}) => {
 const res = await axios.post('http://localhost:5000/auth/register', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return res;
}