import React, { useEffect, useState } from "react";
import InputHandler from "./commonInput";
import SimpleTable from "./simpleTable";
function MainComponent(props) {
  const { getUsers, userState, addUser, deleteUser, editUser } = props;

  const [editId, setEditId] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  const handleSubmit = ({ name, email }) => {
    addUser({ name, email });
  };
  const handleEditSubmit = ({ id, name, email }) => {
    editUser({ id, name, email });
  };
  const handleDelete = (id) => {
    deleteUser(id);
  };
  const handleEdit = (user) => {
    setEditId(user.id);
    setEditUserData(user);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div id="main-container-wrapper">
      <InputHandler
        onSubmit={handleSubmit}
        onEditSubmit={handleEditSubmit}
        editMode={editId}
        editUserData={editUserData}
      />
      <SimpleTable
        dataSource={userState.users}
        handleRemove={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default MainComponent;
