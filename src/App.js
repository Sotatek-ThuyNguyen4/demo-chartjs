import logo from "./logo.svg";
import "./App.css";
import CustomLineChart from "./components/customLineChart";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto py-4">
        <h1>Demo App</h1>
        <div className="mt-5 py-4 row">
          <div className="col col-md-6">
            <div className="card">
              <div className="card-header">Balance Overview</div>
              <div className="card-body">
                <CustomLineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
