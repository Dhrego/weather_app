import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [bgDefault, setBgDefault] = useState(true);

  async function search(e) {
    if (e.key === "Enter" && e.target.value) {
      setLocation(e.target.value);
      const key = "4feb26cde8264d66864193124232007";
      const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;

      try {
        const response = await axios.get(baseUrl);
        setData(response.data);
        setBgDefault(false);
      } catch (error) {
        console.error(error);
      }
      setLocation("");
    }
  }
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div
          className={`col-10 col-md-6 p-5 shadow rounded-5 ${
            data.current?.is_day === 0 ? "night" : bgDefault ? "" : "day"
          }`}
        >
          <h1 className="text-center pb-3">Weather App</h1>
          <div className="input-group mb-3">
            <input
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={search}
              type="text"
              className="form-control rounded-3"
              placeholder="enter city"
              value={location}
            />
          </div>

          <div className="container-fluid ">
            <div className="">
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

            <div className=" my-1">
              {data.current ? (
                <p>
                  <small>Weather description: </small>
                  {data.current.condition.text}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

export default App;
