import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import BiodataDoc from "./Doc";
import { Biodata } from "../BiodataForm";

import "../demo.css"
export default function DownloadBtn({
  data,
  photo,
}: {
  data: Biodata;
  photo?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    const blob = await pdf(<BiodataDoc data={data} photo={photo} />).toBlob();
    saveAs(blob, `biodata_${data.fullName.replace(/\\s+/g, "_")}.pdf`);
    setLoading(false);
  };

  return (
    <button
      onClick={handle}
      disabled={loading}
      className="bg-green-600 text-white px-6 py-2 rounded"
    >
      {loading ? <span className={css.spinner}></span> : "Download PDF"}
    </button>
  );
}
