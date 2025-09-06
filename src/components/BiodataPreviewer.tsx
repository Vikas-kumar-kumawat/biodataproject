import React from "react";

interface Biodata {
  fullName?: string;
  age?: string;
  email?: string;
  phone?: string;
  address?: string;
  education?: string;
  skills?: string[];
  photo?: string;
}

interface Props {
  biodata?: Biodata;
}

const BiodataPreviewer: React.FC<Props> = ({ biodata }) => {
  const {
    fullName = "Your Name",
    age = "-",
    email = "-",
    phone = "-",
    address = "-",
    education = "-",
    skills = [],
    photo,
  } = biodata || {};

  return (
    <div className="preview-container">
      <div className="photo-section">
        {photo ? (
          <img src={photo} alt="Profile" className="roundPhoto" />
        ) : (
          <div className="roundPhoto" style={{ background: "#ddd" }} />
        )}
      </div>
      <div className="info-section">
        <h2>{fullName}</h2>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Education:</strong> {education}</p>
        <p><strong>Skills:</strong> {skills.length ? skills.join(", ") : "-"}</p>
      </div>
    </div>
  );
};

export default BiodataPreviewer;
