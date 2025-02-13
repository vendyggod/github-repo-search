import "./app/globalStyles.css";
import { SearchBar } from "./components/SearchBar";
import { RepoList } from "./components/RepoList";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto px-4 py-8">
        <header>
          <h1 className="text-3xl font-bold text-center mb-8">
            GitHub Repo Search
          </h1>
        </header>
        <main>
          <SearchBar />
          <RepoList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
