import { useState } from "react";
import "./App.css";
import { BrokenLinks } from "./api/api";

function App() {
  const [url, setUrl] = useState("");
  const [reports, setReports] = useState({
    brokenLinks: false,
    canonicalTags: false,
    h1Tags: false,
  });

  const handleChange = (e) => {
    setReports((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(url);
    console.log(reports);

    setUrl("");
    setReports({
      brokenLinks: false,
      canonicalTags: false,
      h1Tags: false,
    });
  };

  const BrokenLinksArr = BrokenLinks(url);

  const headers = Object.keys(BrokenLinksArr).map((key) => ({
    label: key.toUpperCase(),
    key,
  }));

  const handleExportCSV = () => {
    const csvData = BrokenLinksArr.map((row) =>
      headers.map((header) => row[header]).join(",")
    ).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <div className="input-box">
          <label>BrokenLinks</label>
          <input
            type="checkbox"
            checked={reports.brokenLinks}
            name="brokenLinks"
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label>canonicalTags</label>
          <input
            type="checkbox"
            checked={reports.canonicalTags}
            name="canonicalTags"
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label>h1Tags</label>
          <input
            type="checkbox"
            checked={reports.h1Tags}
            name="h1Tags"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={handleExportCSV}>Export CSV</button>
      </form>
      <div className="output"></div>
    </div>
  );
}

export default App;
