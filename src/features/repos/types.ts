export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
}

export interface RepoState {
  items: Repo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
  username: string;
}