import { useState, ChangeEvent } from "react";
import filterIcon from "../../Assets/Images/Display.svg";
import downIcon from "../../Assets/Images/Down.svg";
import "./Navbar.css";

type GroupingOption = "status" | "user" | "priority";
type OrderingOption = "priority" | "title";

interface NavbarProps {
  groupValue: GroupingOption; 
  orderValue: OrderingOption;
  handleGroupValue: (value: GroupingOption) => void;
  handleOrderValue: (value: OrderingOption) => void;
}

export default function Navbar(props: NavbarProps) {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  function handleDisplayToggle(e: ChangeEvent<HTMLSelectElement>) {
    setToggleFilter(!toggleFilter);
    if (e.target.value !== undefined) {
      props.handleGroupValue(e.target.value as GroupingOption);
    }
  }

  function handleOrderingValue(e: ChangeEvent<HTMLSelectElement>) {
    setToggleFilter(!toggleFilter);
    if (e.target.value !== undefined) {
      props.handleOrderValue(e.target.value as OrderingOption);
    }
  }

  return (
    <>
      <section className="nav">
        <div className="nav-container">
          <div>
            <div
              className="nav-disp-btn"
              onClick={() => setToggleFilter(!toggleFilter)}
            >
              <div className="nav-disp-icon nav-disp-filter">
                <img src={filterIcon} alt="icon" />
              </div>
              <div className="nav-disp-heading">Display</div>
              <div className="nav-disp-icon nav-disp-drop">
                <img src={downIcon} alt="icon" />
              </div>
            </div>
            <div
              className={
                toggleFilter
                  ? "nav-disp-dropdown nav-disp-dropdown-show"
                  : "nav-disp-dropdown"
              }
            >
              <div className="nav-disp-filters">
                <div className="nav-dropdown-category">Grouping</div>
                <div className="nav-dropdown-selector">
                  <select
                    value={props.groupValue}
                    onChange={handleDisplayToggle}
                    className="nav-selector"
                    name="grouping"
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </div>
              <div className="nav-disp-filters">
                <div className="nav-dropdown-category">Ordering</div>
                <div className="nav-dropdown-selector">
                  <select
                    value={props.orderValue}
                    onChange={handleOrderingValue}
                    className="nav-selector"
                    name="ordering"
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
