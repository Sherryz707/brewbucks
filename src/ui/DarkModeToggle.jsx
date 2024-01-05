import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button className="btn btn-ghost" onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon />}
    </button>
  );
}

export default DarkModeToggle;
