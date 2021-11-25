import {BASE_URL} from "../../constants/AppConstants";

export const getUrl = (type) => {
  let url = "";

  switch (type) {
    case "GetMosqueByKey":
      return (url = `${BASE_URL}/mosque/getanySpecificmosque`);
    case "signup":
      return (url = `${BASE_URL}/user/signup`);
    case "fileUpload":
      return (url = `${BASE_URL}/upload/fileUpload`);
    case "forgetPassword":
      return (url = `${BASE_URL}/user/changePassword`);
    case "GetAllMosque":
      return (url = `${BASE_URL}/mosque/getAllmosque`);
    case "getMosqueById":
      return (url = `${BASE_URL}/mosque/getmosque`);
    default:
      break;
  }
};