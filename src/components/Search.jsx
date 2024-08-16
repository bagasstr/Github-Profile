import { useOutLineHandler } from "../lib/hook";
import { useUsers } from "../lib/context/useUser.jsx";

export default function Search() {
  const { outLine, setOutline } = useOutLineHandler();
  const { userName, setUserName } = useUsers();

  return (
    <>
      <div
        ref={outLine}
        className={`box-search ${outLine ? "outline-active" : ""}`}
        onMouseDown={() => setOutline(true)}>
        <img src='/Search.svg' alt='' />
        <input
          type='search'
          name='search'
          autoComplete='off'
          placeholder='Username'
          id='search'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className='search'
        />
      </div>
    </>
  );
}
