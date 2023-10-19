import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;
const apiKey = process.env.REACT_APP_APIKEY;

export const getMovieList = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/popular?page=1&api_key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const searchMovie = async (q) => {
  try {
    const response = await axios.get(
      `${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
