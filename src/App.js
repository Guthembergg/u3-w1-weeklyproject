import MyNav from "./Components/MyNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GenresComponent from "./Components/GenresComponent";
import MyFooter from "./Components/MyFooter";

function App() {
  return (
    <body>
      <MyNav />
      <GenresComponent />
      <MyFooter />
    </body>
  );
}

export default App;
