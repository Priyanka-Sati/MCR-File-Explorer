import React, { useState } from "react";
import "./folder.css";
import CreateNewFolderTwoToneIcon from "@mui/icons-material/CreateNewFolderTwoTone";
import PostAddTwoToneIcon from "@mui/icons-material/PostAddTwoTone";

const Folder = ({ handleInsertNode, explorer }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);

    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁{explorer.name}</span>

          <div>
            <CreateNewFolderTwoToneIcon
              fontSize="small"
              onClick={(e) => handleNewFolder(e, true)}
            />
            <PostAddTwoToneIcon
              fontSize="small"
              onClick={(e) => handleNewFolder(e, false)}
            />
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={(e) => onAddFolder(e)}
                className="inputcontainer__input"
                autoFocus
              ></input>
            </div>
          )}

          {explorer.items.map((exp) => {
            // return <span>{exp.name}</span>;
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
};

export default Folder;
