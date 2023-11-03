import Calendar from "./Calendar";
const Sidebar = ({ selectedDay, setSelectedDay }) => {
  return <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />;
};

export default Sidebar;
