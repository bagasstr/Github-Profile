import { github } from "../../data/github";
import Search from "./Search";
import { useUsers } from "../lib/context/useUser.jsx";
import { useRepos, useGithubRepo } from "../lib/hook.js";
import { useState } from "react";
const GithubPage = () => {
  const {
    data: dataUser,
    isLoading,
    error,
    userName,
    setUserName,
  } = useUsers();
  const [userDetail, setUserDetail] = useState(null);
  const { dataRepo, fetchRepos, loading, hashMore } = useRepos();
  const { display, hasMore: hashMoreRepo, loadRepo } = useGithubRepo();

  const loadMore = () => {
    if (userName) {
      fetchRepos(userDetail?.login);
    } else {
      loadRepo();
    }
  };

  const detailUser = (e) => {
    e.preventDefault();
    if (userName) {
      setUserDetail(dataUser);
      fetchRepos(userName);
      setUserName("");
    }
  };

  return (
    <>
      <div className='profile-container'>
        {/* Banner */}
        <div className='profile-banner'>
          <img
            src='/hero-image-github-profile.png'
            alt='GitHub Profile Hero Image'
            className='profile-banner-img'
          />
        </div>

        <div className='profile-search'>
          <Search />
          <div className='search-container absolute top-16 text-text z-10 w-full'>
            {isLoading ? (
              <h1 className='bg-background p-4 rounded-lg cursor-wait'>
                Loading...
              </h1>
            ) : error ? (
              <p>{error.message}</p>
            ) : dataUser ? (
              <div
                key={dataUser?.id}
                onClick={detailUser}
                className='search-result text-text w-full rounded-lg bg-background p-4'>
                <div className='flex gap-x-3'>
                  <img
                    src={dataUser?.avatar_url}
                    alt='Profile Image'
                    className='w-20 h-20 rounded-lg'
                  />
                  <div className='text-left'>
                    <h1 className='font-semibold text-[18px]'>
                      {dataUser?.login ? dataUser?.login : dataUser?.name}
                    </h1>
                    <h2 className='font-semibold text-[12px] '>
                      {dataUser?.bio}
                    </h2>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* User Information */}
        <div className='profile-info'>
          {/* Header Profile */}
          <div className='profile-header'>
            {/* Profile Image */}
            <div className='profile-image-wrapper'>
              <img
                src={userDetail ? userDetail?.avatar_url : github.avatar_url}
                alt='Profile Image'
                className='profile-img'
              />
            </div>

            {/* User Stats */}
            <div className='user-stats'>
              <div className='user-stat followers'>
                <h1 className='stat-title'>Followers</h1>
                <hr />
                <h2 className='stat-value'>
                  {userDetail ? userDetail?.followers : github.followers}
                </h2>
              </div>
              <div className='user-stat following'>
                <h1 className='stat-title'>Following</h1>
                <hr />
                <h2 className='stat-value'>
                  {userDetail ? userDetail?.following : github.following}
                </h2>
              </div>
              <div className='user-stat location'>
                <h1 className='stat-title'>Location</h1>
                <hr />
                <h2 className='stat-value'>
                  {userDetail ? userDetail?.location || "-" : github.location}
                </h2>
              </div>
            </div>
          </div>

          {/* Name and Bio */}
          <div className='profile-details'>
            <h1 className='profile-name'>
              {userDetail ? userDetail?.name || userDetail?.login : github.name}
            </h1>
            <h2 className='profile-bio'>
              {userDetail ? userDetail?.bio || "nothing" : github.bio}
            </h2>
          </div>

          {/* Repositories Github User */}
          <div className='profile-repos'>
            {(dataRepo && dataRepo.length > 0 ? dataRepo : display).map(
              (repo) => (
                <div className='repo-card' key={repo.id}>
                  <h1 className='repo-title'>{repo.name}</h1>
                  <h2 className='repo-description'>{repo.description}</h2>
                  <div className='repo-stats'>
                    {repo.license && (
                      <div className='repo-stat license'>
                        <img
                          src='/Chield_alt.svg'
                          alt='license Icon'
                          className='license-icon'
                        />
                        <h3 className='license-value'>
                          {repo.license.spdx_id}
                        </h3>
                      </div>
                    )}
                    <div className='repo-stat forks'>
                      <img
                        src='/Nesting.svg'
                        alt='fork Icon'
                        className='fork-icon'
                      />
                      <h3 className='fork-value'>{repo.forks_count}</h3>
                    </div>
                    <div className='repo-stat stars'>
                      <img
                        src='/Star.svg'
                        alt='Star Icon'
                        className='stars-icon'
                      />
                      <h3 className='stars-value'>{repo.stargazers_count}</h3>
                    </div>
                    <div className='repo-stat updated'>
                      <h3 className='updated-value'>
                        updated {new Date(repo.updated_at).getDate()} days ago
                      </h3>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className='flex justify-center mt-10'>
            {hashMore && hashMoreRepo && (
              <button
                disabled={loading}
                onClick={loadMore}
                className='bg-primary text-text rounded-lg p-2'>
                {loading ? "Load..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GithubPage;
