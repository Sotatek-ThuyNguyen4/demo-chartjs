import logo from "./logo.svg";
import "./App.css";
import CustomLineChart from "./components/customLineChart";
import CustomRadarChart from "./components/customRadarChat";
import CustomPolarAreaChat from "./components/customPolarAreaChat";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto py-4">
        <h1>Demo App</h1>
        <div className="mt-5 py-4 row">
          <div className="py-3 col-12">
            <div className="card">
              <div className="card-header">Balance Overview</div>
              <div className="card-body">
                <CustomLineChart />
              </div>
            </div>
          </div>
          {/* <div className="py-3 col-12 col-md-6">
            <div className="card">
              <div className="card-header">Deal Type</div>
              <div className="card-body">
                <CustomRadarChart />
              </div>
            </div>
          </div>
          <div className="py-3 col-12 col-md-6">
            <div className="card">
              <div className="card-header">Sales by Locations</div>
              <div className="card-body">
                <CustomPolarAreaChat />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
