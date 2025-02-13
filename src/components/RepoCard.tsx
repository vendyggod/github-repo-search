import { format } from 'date-fns';

interface RepoCardProps {
  repo: {
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    updated_at: string;
  };
}

export const RepoCard = ({ repo }: RepoCardProps) => (
  <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold mb-2">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {repo.name}
      </a>
    </h3>
    <p className="text-gray-600 mb-3">{repo.description || 'No description'}</p>
    <div className="flex justify-between text-sm text-gray-500 ">
      <span>⭐{repo.stargazers_count}</span>
      <span>Updated: {format(new Date(repo.updated_at), 'dd MMM yyyy')}</span>
    </div>
  </div>
);