import Navigation from "./navigation";
import "./index.css";

const error = console.error;
console.error = (...args: string[]) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const App = () => {

  return (
    <main className="theme">
      <Navigation />
    </main>
  );
}

export default App;
