import { h, render } from "preact";
import App from "./App";
import "./style.css"; // Ensure styles are included
import "./i18n";

render(<App />, document.getElementById("app"));
