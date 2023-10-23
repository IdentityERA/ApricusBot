import React, { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";

const FileAttach = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="file-attach-root">
      <label>
        <AttachFileIcon className="attach-file-logo" />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="attach-file-input"
        />
      </label>
      <button onClick={handleUpload} className="upload">Upload</button>
    </div>
  );
};

export default FileAttach;
