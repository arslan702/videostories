import axios from "axios";

export const getRequestedData = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getRequestedDataWithHeader = async (url, authtoken) => {
  try {
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      if (typeof Storage !== "undefined") {
        if (localStorage.getItem("userDataSessionWay")) {
          localStorage.removeItem("userDataSessionWay");
        }
      } else {
        alert("Please update your browser");
      }
      window.location.replace("/");
    }
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

export const getDataPostWithOutHeader = async (url, data) => {
  try {
    return await axios.post(url, data);
  } catch (error) {
    if (error.response.status === 401) {
      if (typeof Storage !== "undefined") {
        if (localStorage.getItem("userDataSessionWay")) {
          localStorage.removeItem("userDataSessionWay");
        }
      } else {
        alert("Please update your browser");
      }
      window.location.replace("/");
    }
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

export const getDataPostWithHeader = async (url, data, authtoken) => {
  try {
    return await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      if (typeof Storage !== "undefined") {
        if (localStorage.getItem("userDataSessionWay")) {
          localStorage.removeItem("userDataSessionWay");
        }
      } else {
        alert("Please update your browser");
      }
      window.location.replace("/");
    }

    throw new Error(error.response.data.message);
  }
};
