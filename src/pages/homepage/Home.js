import React, { Fragment, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import { gql, useSubscription } from "@apollo/client";

import { Link } from "react-router-dom";

import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useMessageDispatch } from "../../context/message";

import Users from "./Users";
import Messages from "./Messages";

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

export default function Home() {
  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();

  const { user } = useAuthState();

  const { data: messageData, error: messageError } =
    useSubscription(NEW_MESSAGE);

  useEffect(() => {
    if (messageError) console.log(messageError);

    if (messageData) {
      const message = messageData.newMessage;
      const otherUser =
        user.username === message.to ? message.from : message.to;

      messageDispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: otherUser,
          message,
        },
      });
    }
  }, [messageError, messageData, messageDispatch, user.username]);

  const logout = () => {
    authDispatch({ type: "LOGOUT" });
    window.location.href = "/";
  };

  return (
    <Fragment>
      <Row className="bg-white justify-content-around mb-1">
        <Button variant="link" className="w-auto" onClick={logout}>
          Logout
        </Button>
        <li>
          <Link className="w-auto" to="/video" target="_blank">
            video
          </Link>
        </li>
      </Row>
      <Row className="bg-white">
        <Users />
        <Messages />
      </Row>
    </Fragment>
  );
}
