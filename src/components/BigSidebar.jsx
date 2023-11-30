import Wrapper from "../assets/wrappers/BigSidebar.js";
import NavLinks from "./NavLinks.jsx";
import Logo from "./Logo.jsx";
import { useSelector } from "react-redux";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"}
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
