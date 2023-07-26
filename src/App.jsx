import { useState } from "react";
import "./App.css";
import axios from "axios";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [valid, setValidity] = useState(true);

  const search = async () => {
    setLocation(location);
    const key = "4feb26cde8264d66864193124232007";
    const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;

    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
      setValidity(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setValidity(false);
    }
    setLocation("");
  };

  const handleSubmit = (e) => {
    if (location !== "" && e.key === "Enter") {
      toast.success("Loading content!", {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        search();
        console.log("Hello, World!");
      }, 1500);
    }
  };
  const handleSearchClick = () => {
    if (location !== "" && valid === true) {
      toast.success("Loading content!", {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        search();
        console.log("Hello, World!");
      }, 1500);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div
          className={clsx("col-10 col-md-6 p-5 shadow rounded-5", {
            night: data.current?.is_day === 0,
            day: data.current?.is_day === 1,
            preset: true,
          })}
        >
          <h1 className="text-center pb-3">Weather App</h1>
          <div className="input-group mb-3">
            <input
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleSubmit}
              type="text"
              className="form-control rounded-start-3 border-0 border-end "
              placeholder="enter city"
              value={location}
              autoFocus
            />
            <button
              onClick={handleSearchClick}
              className="btn bg-white border-start "
            >
              <i className="bi bi-search text-secondary"></i>
            </button>
          </div>

          <div className="container-fluid ">
            <div className="">
              {!valid ? (
                <strong
                  className={clsx("fs-4", {
                    "text-info": data.current?.is_day === 0,
                    "text-muted": data.current?.is_day !== 0,
                  })}
                >
                  Enter valid a city
                </strong>
              ) : null}

              {data.location ? (
                <div className="fs-2">{data.location.name}</div>
              ) : null}

              <div className="row justify-content-between">
                <div className="col">
                  {data.current ? (
                    <p className="display-3">{data.current.temp_c}°C </p>
                  ) : null}

                  {data.current ? (
                    <b className="small">
                      Feels like: {data.current.feelslike_c} °C
                    </b>
                  ) : null}
                </div>

                <div className="col-3">
                  {data.current ? (
                    <img
                      className=""
                      src={data.current.condition.icon}
                      alt=""
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="my-1">
              {data.current ? (
                <p>
                  <b className="small">Weather description: </b>
                  {data.current.condition.text}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default App;
