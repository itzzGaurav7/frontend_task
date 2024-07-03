import React, { useState } from "react";
import { Table, Button, Modal } from "antd";

const SimpleTable = ({ dataSource, handleRemove, handleEdit }) => {
  const [user, setUser] = useState(null);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const handleRemoveClick = (record) => {
    setUser(record);
    setDialogueVisible(true);
    console.log(record);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>{" "}
          <Button
            danger
            type="primary"
            onClick={() => handleRemoveClick(record)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleOk = () => {
    if (user) {
      handleRemove(user.id);
      setDialogueVisible(false);
      setUser(null);
    }
  };
  const handleCancel = () => {
    setDialogueVisible(false);
    setUser(null);
  };

  return (
    <div className="simpletable">
      <Modal
        title="Delete User"
        visible={dialogueVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Delete user:</p>
        {user && (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </>
        )}
      </Modal>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default SimpleTable;
