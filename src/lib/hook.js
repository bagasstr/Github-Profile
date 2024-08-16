import { useState, useRef, useEffect } from "react";
import { githubRepos } from "../../data/github-repos";

const GITHUB_API_BASE_URL = "https://api.github.com/users";

export function useOutLineHandler() {
  const [outLine, setOutline] = useState(false);
  const outline = useRef(null);

  const activeOutline = (e) => {
    if (outline.current && !outline.current.contains(e.target)) {
      setOutline(false);
    }
  };
  useEffect(() => {
    if (outLine) {
      document.addEventListener("mousedown", activeOutline);
    } else {
      document.removeEventListener("mousedown", activeOutline);
    }
    return () => {
      document.removeEventListener("mousedown", activeOutline);
    };
  }, [outLine]);

  return { outline, setOutline };
}

export function useRepos() {
  const [dataRepo, setDataRepo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hashMore, setHashMore] = useState(true);
  const perPage = 5;

  const fetchRepos = async (user) => {
    if (loading || !hashMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${GITHUB_API_BASE_URL}/${user}/repos?per_page=${perPage}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setDataRepo((prevData) => [...prevData, ...data]);
      setPage((prevPage) => prevPage + 1);
      setHashMore(data.length === perPage);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { dataRepo, hashMore, loading, error, fetchRepos };
}

export function useGithubRepo() {
  const [page, setPage] = useState(1);
  const [display, setDisplay] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 5;
  useEffect(() => {
    loadRepo();
  }, []);
  const loadRepo = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = githubRepos.slice(startIndex, endIndex);

    setDisplay((prev) => {
      // Membuat Set dari id repo yang sudah ada
      const existingIds = new Set(prev.map((repo) => repo.id));

      // Filter item baru yang belum ada di display
      const newItems = currentItems.filter((repo) => !existingIds.has(repo.id));
      console.log(prev);

      return [...prev, ...newItems];
    });
    setPage((prev) => prev + 1);
    setHasMore(endIndex < githubRepos.length);
  };

  return { display, hasMore, loadRepo };
}
