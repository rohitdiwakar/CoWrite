import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-pro-react";
import { api_base_url } from "../Helper";
import { useSocket } from "../context/socketcontext";
const createDocs = () => {
  let { docsId } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const socket = useSocket();

  const [data, setData] = useState("");

  const updateDoc = () => {
    fetch(api_base_url + "/uploadDoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        docId: docsId,
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError(data.message);
        } else {
          setError("");
        }
      })
      .catch((error) => {
        console.error("Error updating document:", error);
        setError("An error occurred while updating the document.");
      });
  };

  const getContent = () => {
    fetch(api_base_url + "/getDoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        docId: docsId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          setError(data.message);
        } else {
          setContent(data.doc.content);
        }
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
        setError("An error occurred while fetching the document.");
      });
  };

  // useEffect(() => {
  //   getContent();
  //   const socket = io("http://localhost:3000");
  //     socket.on("connect", () => {
  //     console.log("Connected to server");
  // });

  // socket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  // });

  // return () => {
  //     socket.disconnect();
  // };

  // }, []);

  useEffect(() => {
    getContent();
    if (!socket) return;

    // Listen for document content changes from the server
    socket.emit("join_document", docsId);

    socket.on("document_content", (newContent) => {
      setContent(newContent);
    });

    socket.on("document_update", (updatedContent) => {
      setContent(updatedContent);
    });

    return () => {
      socket.emit("leave_document", docsId);
      socket.off("document_content");
      socket.off("document_update");
    };
  }, [socket, docsId]);

  const handleContentChange = (newContent) => {
    setContent(newContent);

    // Emit the updated content to the server
    if (socket) {
      socket.emit("edit_document", {
        docId: docsId,
        updatedContent: newContent,
      });
    }

    // Optionally debounce this call
    updateDoc();
  };

  return (
    <>
      <Navbar />
      <div className="px-[100px] mt-3">
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          // onChange={(newContent) => {
          //   handleContentChange(newContent);
          // }}
          onChange={handleContentChange}
        />
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default createDocs;
