import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync } from "../store/users/usersSlice";


const FetchUsers = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(users);
  const LoadingState = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
  };

  useEffect(() => { //handle error when changing error state
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(()=> { 
    dispatch(fetchUsersAsync())
  },[])

  return  (
    <>
    <LoadingState />
    {error && <div>Error: {error}</div>}
    <ul>
    {users.map((user) => (
        <li key={user.login.uuid}>
            {user.name.first} {user.name.last}
        </li>
    ))}
    </ul>
    </>
  )
};

export default FetchUsers;