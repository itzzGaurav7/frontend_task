import React, { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";
import { useEffect } from "react";
import { Alert } from "antd";

const InputHandler = ({
  onSubmit,
  onEditSubmit,
  editMode = false,
  editUserData,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    if (editMode) {
      setName(editUserData.name);
      setEmail(editUserData.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !isValidEmail(email.trim())) {
      setEmailError("Invalid Email");
      return;
    }
    setEmailError(null);
    if (editMode) {
      onEditSubmit({ id: editUserData.id, name, email });
      editMode = false;
    } else {
      onSubmit({ name, email });
      setEmail("");
      setName("");
    }
  };
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="header-box">
      <Input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {emailError && <Alert message={emailError} type="error" showIcon />}
      <Button type="primary" onClick={handleSubmit}>
        {!!editMode ? "Edit user" : "Add user"}
      </Button>
    </div>
  );
};

export default InputHandler;
