import React, { useState } from "react";
import styled from "styled-components";
import { Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function ChatInput({ handleSendMsg, contacts }) {
  const [msg, setMsg] = useState("");
  const [theme, setTheme] = useState("");
  const { Option } = Select;
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div>
        <Select
          allowClear
          showSearch
          size="large"
          placeholder="Select a person"
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {contacts?.map(({ _id, username }) => (
            <Option key={_id} value={_id}>
              {username}
            </Option>
          ))}
        </Select>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <Input
          type="text"
          placeholder="Enter your theme here"
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
        />
        <TextArea
          type="text"
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder="Enter your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">Send message</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  background-color: #080420;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
  }
  .input-container {
    width: 100%;
    align-items: center;
    gap: 2rem;
    input {
      width: 100%;
      border: none;
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      font-size: 1rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      padding-left: 1rem;
      margin-bottom: 0.5rem;
      font-size: 1rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      width: 100%;
      padding: 1rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;
