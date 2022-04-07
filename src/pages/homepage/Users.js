import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Col, Image } from "react-bootstrap";
import classNames from "classnames";

import { useMessageDispatch, useMessageState } from "../../context/message";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      createdAt
      imageUrl
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`;

export default function Users() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true)?.username;

  //   const { loading } = useQuery(GET_USERS, {
  //     onCompleted: (data) =>
  //       dispatch({ type: 'SET_USERS', payload: data.getUsers }),
  //     onError: (err) => console.log(err),
  //   })

  const { loading, data } = useQuery(GET_USERS);
  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_USERS", payload: data.getUsers });
    }
  }, [data, dispatch]);

  let usersMarkup;
  if (!users || loading) {
    usersMarkup = <p>Loading..</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => {
      const selected = selectedUser === user.username;
      return (
        <div
          role="button"
          className={classNames("user-div d-flex p-2", {
            "bg-white": selected,
          })}
          key={user.username}
          onClick={() =>
            dispatch({ type: "SET_SELECTED_USER", payload: user.username })
          }
        >
          <Image
            src={
              user.imageUrl ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            roundedCircle
            className="m-2"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
          <div className="d-none d-md-block m-2 overflow-hidden">
            <p className="text-success mb-1">{user.username}</p>
            <p className="font-weight-light mb-1 text-nowrap">
              {user.latestMessage
                ? user.latestMessage.content
                : "You are now connected!"}
            </p>
          </div>
        </div>
      );
    });
  }

  return (
    <Col xs={2} md={4} className="users-box p-0 bg-secondary">
      {usersMarkup}
    </Col>
  );
}
