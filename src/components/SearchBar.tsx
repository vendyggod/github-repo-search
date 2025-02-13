import { useCallback } from 'react';
import { fetchRepos, resetState } from '../features/repos/repoSlice';
import {useAppDispatch} from '../app/hooks.ts';
import debounce from 'lodash/debounce';

export const SearchBar = () => {
  const dispatch = useAppDispatch();

  const handleSearch = useCallback(
    debounce((username: string) => {
      if (username) {
        dispatch(resetState());
        dispatch(fetchRepos({ username, page: 1 }));
      }
    }, 500),
    []
  );

  return (
    <input
      type="text"
      placeholder="Enter GitHub username"
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full max-w-md p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};