import React, { useState } from "react";
import BiodataForm from "./components/BiodataForm";
import BiodataPreviewer from "./components/BiodataPreviewer";
import ImageCropper from "./components/ImageCropper";
import "./App.css";

const App = () => {
  const [biodata, setBiodata] = useState({
    fullName: "",
    dob: "",
    height: "",
    customFields: [],
    photo: "",
  });

  const [photo, setPhoto] = useState("");

  return (
    <div className="app-container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Biodata Builder</h1>
      <div className="main-content flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        <div className="form-section flex-1 space-y-4">
          <BiodataForm onChange={(data) => setBiodata({ ...data, photo })} />
          <ImageCropper onChange={setPhoto} />
        </div>
        <div className="preview-section flex-1 bg-white rounded-2xl p-4 shadow previewScroll">
          <BiodataPreviewer biodata={{ ...biodata, photo }} />
        </div>
      </div>
    </div>
  );
};

export default App;
