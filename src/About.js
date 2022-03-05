import React, { useState, useEffect } from "react";

export default function UsersData() {
  const [Users, fetchUsers] = useState([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchUsers(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2>React Fetch API Example</h2>
      <ul>
        {Users.map((item, i) => {
          return <li key={i}>{item.name}</li>;
        })}
      </ul>
    </>
  );
}
