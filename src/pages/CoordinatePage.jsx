import { useState } from "react";
// import Select from "react-select";
// import Creatable from 'react-select/creatable';
import toast, { Toaster } from 'react-hot-toast';
import { collection,addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import options from '../data/data.json'
import CreatableSelect from "react-select/creatable";


function CoordinatePage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading,setLoading] = useState(false)

  const customStyles = {
    control: (base) => ({
      ...base,
      background: "#020617",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
    input: (base) => ({
      ...base,
      color: "#fff",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#f1f1f1", // Custom colour
    }),
    option: (base, state) => ({
      ...base,
      borderStyle: 'solid',
      borderColor: "#fff",
      backgroundColor: state.isSelected ? "#0c1724" : "#23324a",
      "&:hover": { backgroundColor: state.isSelected ? "#0c1724" : "#0c1724" },
    }),
    menuList: (provided, state) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
      
    }),
  };


  const handleGetCoordinates = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error("Error getting coordinates:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };



  const handleSubmit = async () => {
    // Replace this with code to submit data to your API.
    // You can use the 'selectedOption', 'latitude', and 'longitude' variables in your request.
    if (!selectedOption) {
      toast('Please select an outlet code!',
        {
          icon: '⚠️',
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    }

    try {
      setLoading(true)
      const docRef = await addDoc(collection(db, "outlets"), {
        outlet: selectedOption.value,
        latitude: latitude,
        longitude: longitude
      });
      // console.log(docRef);
      // console.log("Document written with ID: ", docRef.id);
      if(docRef){
        toast.success('Successfully Submitted!')
        setLoading(false)
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Problem submitting the data!")
      setLoading(false)
    }


    // console.log("Selected Option:", selectedOption);
    // console.log("Latitude:", latitude);
    // console.log("Longitude:", longitude);
  };



  return (
    <div className="w-[450px] mx-auto p-4 flex flex-col justify-center">
      <h1 className="text-2xl font-semibold mb-10 mx-auto">🗺️ Coordinate Form</h1>

      <div className="flex flex-col justify-between">
        <div className="mb-4 w-full">
          <label className="block mb-2">Select an outlet:</label>
          <CreatableSelect
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            isSearchable={true}
            styles={customStyles}
            className=""
          />
        </div>

        <div>
          <div className="mb-4">
            <label className="block mb-2">Latitude:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded bg-slate-950"
              value={latitude}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Longitude:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded bg-slate-950"
              value={longitude}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4 justify-center items-center">
        <button
          className="w-full bg-indigo-500 flex items-center justify-center gap-4 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg"
          onClick={handleGetCoordinates}
        >
          <span>
            <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0-80Z" /></svg>
          </span>
          Get Coordinates
        </button>

        {<button
          disabled={loading}
          className={`w-full ${longitude && latitude ? "visible" : "invisible"} flex justify-center items-center gap-4  bg-pink-700 hover:bg-pink-600 text-white px-4 py-3 rounded-lg`}
          onClick={handleSubmit}
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white"><path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" /></svg>
          </span>
         {loading?"Loading..." : 'Submit Coordinates'}
        </button>}

      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default CoordinatePage;
