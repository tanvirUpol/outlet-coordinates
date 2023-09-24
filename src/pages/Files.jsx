import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState } from "react";
import * as XLSX from "xlsx";

const Files = () => {
  const [outletData, setOutletData] = useState([]);

  const downloadOutletsCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "outlets"));

      const outlets = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        outlets.push(doc.data());
      });

      // Log the downloaded data to the console
      console.log("Downloaded Users Collection:", outlets);
      setOutletData(outlets);

      const worksheet = XLSX.utils.json_to_sheet(outlets);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "outlet info");
      XLSX.writeFile(workbook, "data.xlsx");
    } catch (error) {
      console.error("Error downloading users collection:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={downloadOutletsCollection}
      >
        Download Users
      </button>
    </div>
  );
};

export default Files;
