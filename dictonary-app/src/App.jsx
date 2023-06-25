import "./App.css";
import Dict from "./Dict";

function App() {
  return (
    <>
      <section className="nav">
        <i className="fa-solid fa-book-open-reader logo "></i>
        <span className="title">Dictionary App</span>
      </section>
      <Dict />
    </>
  );
}

export default App;
