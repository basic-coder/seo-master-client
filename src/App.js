import { useEffect, useState } from "react";
import "./App.css";
import { UtilityResp } from "./api/api";

function App() {
  const [url, setUrl] = useState("");
  const [reports, setReports] = useState("");
  const [csvData, setcsvData] = useState([]);
  const [header, setHeader] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opWindow, setOpWindow] = useState(false);

  const handleChange = (e) => {
    setReports(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    switch (reports) {
      case "brokenLinks":
        const link1 = await UtilityResp(url, "broken-link-report");
        setcsvData(link1.data.brokenLinksReport);
        setLoading(false);
        break;
      case "canonicalTags":
        const link2 = await UtilityResp(url, "canonical-report");
        setcsvData(link2.data.canonicalTagReport);
        setLoading(false);
        break;
      case "h1Tags":
        const link3 = await UtilityResp(url, "h1-report");
        setcsvData(link3.data.h1TagReport);
        setLoading(false);
        break;
      case "canonical301":
        const link4 = await UtilityResp(url, "canonical301");
        setcsvData(link4.data.Canonical301);
        setLoading(false);
        break;
      case "loadingTime":
        const link5 = await UtilityResp(url, "loading-time");
        setcsvData(link5.data.linkLoadingTime);
        setLoading(false);
        break;

      default:
        console.log("nothing is selected");
        break;
    }
  };

  const exportToCsv = (data) => {
    const fields = Object.keys(data[0]);

    const csvData = [
      fields.join(","),
      ...data.map((obj) => fields.map((field) => obj[field]).join(",")),
    ].join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let filename = `${reports}(${day}-${month}-${year}-${hours}-${min}-${sec})`;

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setcsvData([]);
  };

  const setWindow = () =>{
    setHeader(Object.keys(csvData[0]));
    setOpWindow(!opWindow)
  }

  return (
    <div className="App container">
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            required
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your url"
          />
        </div>
        {csvData.length > 0 && (
          <div className="input-box">
          <label htmlFor="BrokenLinks">Output Window </label>
          <input type="checkbox" onChange={setWindow} />
        </div>
        )}    
        <div className="input-box">
          <label htmlFor="BrokenLinks">BrokenLinks</label>
          <input
            id="BrokenLinks"
            type="radio"
            name="reports"
            value="brokenLinks"
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="canonicalTags">canonicalTags</label>
          <input
            id="canonicalTags"
            type="radio"
            name="reports"
            value="canonicalTags"
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="h1Tags">h1Tags</label>
          <input
            id="h1Tags"
            type="radio"
            name="reports"
            value="h1Tags"
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="caonical301">Canonical 301</label>
          <input
            id="caonical301"
            type="radio"
            name="reports"
            value="canonical301"
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="loadingTime">Loading Time</label>
          <input
            id="loadingTime"
            type="radio"
            name="reports"
            value="loadingTime"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
        {csvData.length > 0 && loading===false &&(
          <button type="button" onClick={() => exportToCsv(csvData)}>
            Export Data
          </button>
        )}

        {loading && <span className="loading"></span>}
      </form>
      {opWindow && csvData.length > 0 && (
        <div className="output">
          <h2> Output Window</h2>

          <table>
            <thead>
              <tr>
                {header.map((header) => (
                  <th key={header}>{header.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((item, i) => (
                <tr key={i}>
                  {header.map((header) => (
                    <td key={header}>{item[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
