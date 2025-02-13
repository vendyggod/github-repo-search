import {RepoState} from './types.ts'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: RepoState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: false,
  username: '',
};

export const fetchRepos = createAsyncThunk(
  'repos/fetchRepos',
  async ({ username, page }: { username: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?page=${page}&per_page=20`
      );
      return { data: response.data, username };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
      }
      return rejectWithValue('Unknown error');
    }
  }
);

const repoSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        if (state.username !== action.meta.arg.username) {
          state.items = action.payload.data;
          state.username = action.payload.username;
        } else {
          state.items = [...state.items, ...action.payload.data];
        }
        state.status = 'succeeded';
        state.page = action.meta.arg.page;
        state.hasMore = action.payload.data.length === 20;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = repoSlice.actions;
export default repoSlice.reducer;