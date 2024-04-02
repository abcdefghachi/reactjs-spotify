import axios from "axios";
const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {}
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUser`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artists/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};
export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};
// export const changingUserProfile =async (userId , role) =>{
//   try {
//     const res = await axios.put(`${baseURL}/api/users/updateRole/${userId}`,{
//       data :{role :role}
//     });
//     return res;
//   } catch (error) {
//     return null;
//   }
// }
// export const removeUser = async (userId) => {
//   try {
//     const res = await axios.delete(`${baseURL}/api/users/deleteUser/${userId}`);
//     return res;
//   } catch (error) {
//     return null;
//   }
// }
