import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=9261476128d4f3461d31585110237cc7';

const initialState = {
  upComingMovieData: [],
  popularMovies: [],
  popularTv: [],
  actionMovies: [],
  animationMovies: [],
  comedyMovies: [],
  documentaryMovies: [],
  familyMovies: [],
  fantasyMovies: [],
  horrorMovies: [],
  romanceMovies: [],
  scienceFictionMovies: [],
};

const Home = createSlice({
  name: 'Home',
  initialState: initialState,
  reducers: {
    setUpComingMovies: (state, action) => {
      state.upComingMovieData = action.payload;
    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setPopularTv: (state, action) => {
      state.popularTv = action.payload;
    },
    setActionMovies: (state, action) => {
      state.actionMovies = action.payload;
    },
    setAnimationMovies: (state, action) => {
      state.animationMovies = action.payload;
    },
    setComedyMovies: (state, action) => {
      state.comedyMovies = action.payload;
    },
    setDocumentaryMovies: (state, action) => {
      state.documentaryMovies = action.payload;
    },
    setFamilyMovies: (state, action) => {
      state.familyMovies = action.payload;
    },
    setFantasyMovies: (state, action) => {
      state.fantasyMovies = action.payload;
    },
    setHorrorMovies: (state, action) => {
      state.horrorMovies = action.payload;
    },
    setRomanceMovies: (state, action) => {
      state.romanceMovies = action.payload;
    },
    setScienceFictionMovies: (state, action) => {
      state.scienceFictionMovies = action.payload;
    },
  },
});

export const getUpComingMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
    dispatch(setUpComingMovies(resp.data.results));
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
    dispatch(setPopularMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In gePopularMovieAction: ${error}`;
    console.log(msg);
  }
};

export const getPopularTvAction = () => async dispatch => {
  try {
    const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
    dispatch(setPopularTv(resp.data.results));
  } catch (error) {
    let msg = `Error In getPopularTvAction: ${error}`;
    console.log(msg);
  }
};

export const getActionMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=28`,
    );
    dispatch(setActionMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In getActionMoviesAction: ${error}`;
    console.log(msg);
  }
};

export const getAnimationMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=16`,
    );
    dispatch(setAnimationMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In getAnimationMoviesAction: ${error}`;
    console.log(msg);
  }
};

export const getComedyMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=35`,
    );
    dispatch(setComedyMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In getComedyMoviesAction: ${error}`;
    console.log(msg);
  }
};

export const getDocumentaryMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
    );
    dispatch(setDocumentaryMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In getDocumentaryMoviesAction: ${error}`;
    console.log(msg);
  }
};

export const getFamilyMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
    );
    dispatch(setFamilyMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In getFamilyMoviesAction: ${error}`;
    console.log(msg);
  }
};

export const getFantasyMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=14`,
    );
    dispatch(setFantasyMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In getFantasyMoviesAction: ${error}`;
    console.log(msg);
  }
};

export const getHorrorMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=27`,
    );
    dispatch(setHorrorMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In getHorrorMoviesAction: ${error}`;
    console.log(msg);
  }
};

export const getRomanceMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=10749`,
    );
    dispatch(setRomanceMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In getRomanceMoviesAction: ${error}`;
    console.log(msg);
  }
};

export const getScienceFictionMoviesAction = () => async dispatch => {
  try {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=878`,
    );
    dispatch(setScienceFictionMovies(resp.data.results));
  } catch (error) {
    let msg = `Error In getScienceFictionMoviesAction: ${error}`;
    console.log(msg);
  }
};

export const {
  setUpComingMovies,
  setActionMovies,
  setAnimationMovies,
  setComedyMovies,
  setDocumentaryMovies,
  setFamilyMovies,
  setFantasyMovies,
  setHorrorMovies,
  setRomanceMovies,
  setScienceFictionMovies,
  setPopularMovies,
  setPopularTv,
} = Home.actions;
export default Home.reducer;
