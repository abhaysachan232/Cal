import Calendar from "./components/Calendar";

function App() {
  return (
    <div>
      <Calendar date={new Date(2022, 9, 3)} />
    </div>
  );
}

export default App;
