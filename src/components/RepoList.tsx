import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchRepos } from '../features/repos/repoSlice';
import { RepoCard } from './RepoCard';
import { Loader } from './Loader';

export const RepoList = () => {
  const { items, status, error, page, hasMore, username } = useAppSelector((state) => state.repos);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (hasMore && username) {
      dispatch(fetchRepos({ username, page: page + 1 }));
    }
  };

  if (status === 'failed') {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={
        <p className="text-center text-gray-500 my-4">
          {items.length > 0 ? "No more repositories" : "No repositories found"}
        </p>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </InfiniteScroll>
  );
};