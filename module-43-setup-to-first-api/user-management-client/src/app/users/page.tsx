import React from "react";

const UsersPage = async () => {
  const data = await fetch("http://localhost:5000/users");
  const users = await data.json();
  console.log( users);
  return (
    <div>
      <h2>Users are coming soon :{users.length}</h2>
    </div>
  );
};

export default UsersPage;
