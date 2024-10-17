const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_BASE_URL!
    : process.env.REACT_APP_API_BASE_URL!;

export default API_BASE_URL;
