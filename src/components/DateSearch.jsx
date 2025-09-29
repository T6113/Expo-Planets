import { useState, useEffect, useRef } from "react";
import { getAPODByDate, getAPODByBirthday } from "../utils/nasa-api";
import ZodiacSearch from "./ZodiacSearch";
import "./DateSearch.css";

function DateSearch({ onAPODFound, onError, onLoading }) {
  const [searchType, setSearchType] = useState("date"); // 'date', 'birthday', or 'zodiac'
  const [birthday, setBirthday] = useState({
    month: "",
    day: "",
    year: "",
  });

  // Custom dropdown states for both date picker and birthday
  const [dropdownOpen, setDropdownOpen] = useState({
    month: false,
    day: false,
    year: false,
    dateMonth: false,
    dateDay: false,
    dateYear: false,
  });

  // Custom date picker state
  const [customDate, setCustomDate] = useState({
    month: "",
    day: "",
    year: "",
  });

  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen({
          month: false,
          day: false,
          year: false,
          dateMonth: false,
          dateDay: false,
          dateYear: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateSearch = async (e) => {
    e.preventDefault();

    // Check if we have custom date
    let dateToSearch = "";
    if (customDate.month && customDate.day && customDate.year) {
      const paddedMonth = customDate.month.toString().padStart(2, "0");
      const paddedDay = customDate.day.toString().padStart(2, "0");
      dateToSearch = `${customDate.year}-${paddedMonth}-${paddedDay}`;
    }

    if (!dateToSearch) {
      onError("Please select a date");
      return;
    }

    try {
      onLoading(true);
      onError(null);
      const apodData = await getAPODByDate(dateToSearch);
      onAPODFound(apodData);
    } catch (error) {
      onError(error.message);
    } finally {
      onLoading(false);
    }
  };

  const handleBirthdaySearch = async (e) => {
    e.preventDefault();
    if (!birthday.month || !birthday.day || !birthday.year) {
      onError("Please fill in all birthday fields");
      return;
    }

    try {
      onLoading(true);
      onError(null);
      const apodData = await getAPODByBirthday(
        parseInt(birthday.month),
        parseInt(birthday.day),
        parseInt(birthday.year)
      );
      onAPODFound(apodData);
    } catch (error) {
      onError(error.message);
    } finally {
      onLoading(false);
    }
  };

  const handleBirthdayChange = (field, value) => {
    setBirthday((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Close dropdown after selection
    setDropdownOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleCustomDateChange = (field, value) => {
    setCustomDate((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Close dropdown after selection
    setDropdownOpen((prev) => ({
      ...prev,
      [`date${field.charAt(0).toUpperCase() + field.slice(1)}`]: false,
    }));
  };

  const toggleDropdown = (field) => {
    setDropdownOpen((prev) => ({
      month: false,
      day: false,
      year: false,
      dateMonth: false,
      dateDay: false,
      dateYear: false,
      [field]: !prev[field],
    }));
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1995 + 1 },
    (_, i) => currentYear - i
  );

  // Check if any dropdown is open for z-index boost
  const isAnyDropdownOpen = Object.values(dropdownOpen).some(
    (isOpen) => isOpen
  );

  return (
    <section
      className={`date-search ${
        isAnyDropdownOpen ? "date-search--dropdown-open" : ""
      }`}
    >
      <h3 className="date-search__title">🔍 Explore Space Through Time</h3>

      <div className="date-search__tabs">
        <button
          className={`date-search__tab ${
            searchType === "date" ? "date-search__tab--active" : ""
          }`}
          onClick={() => setSearchType("date")}
        >
          📅 Pick a Date
        </button>
        <button
          className={`date-search__tab ${
            searchType === "birthday" ? "date-search__tab--active" : ""
          }`}
          onClick={() => setSearchType("birthday")}
        >
          🎂 Birthday Search
        </button>
        <button
          className={`date-search__tab ${
            searchType === "zodiac" ? "date-search__tab--active" : ""
          }`}
          onClick={() => setSearchType("zodiac")}
        >
          ♒ Zodiac Signs
        </button>
      </div>

      {searchType === "date" && (
        <form className="date-search__form" onSubmit={handleDateSearch}>
          <p className="date-search__instruction">
            Select any date since June 16, 1995:
          </p>

          <div className="date-search__date-fields" ref={dropdownRef}>
            {/* Month Dropdown */}
            <div className="date-search__field">
              <label className="date-search__label">Month:</label>
              <div className="date-search__custom-select">
                <button
                  type="button"
                  className="date-search__select-button"
                  onClick={() => toggleDropdown("dateMonth")}
                >
                  {customDate.month
                    ? months[customDate.month - 1]
                    : "Select Month"}
                  <span
                    className={`date-search__select-arrow ${
                      dropdownOpen.dateMonth
                        ? "date-search__select-arrow--open"
                        : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {dropdownOpen.dateMonth && (
                  <div className="date-search__select-dropdown">
                    {months.map((month, index) => (
                      <button
                        key={index + 1}
                        type="button"
                        className="date-search__select-option"
                        onClick={() =>
                          handleCustomDateChange("month", index + 1)
                        }
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Day Dropdown */}
            <div className="date-search__field">
              <label className="date-search__label">Day:</label>
              <div className="date-search__custom-select">
                <button
                  type="button"
                  className="date-search__select-button"
                  onClick={() => toggleDropdown("dateDay")}
                >
                  {customDate.day ? customDate.day : "Select Day"}
                  <span
                    className={`date-search__select-arrow ${
                      dropdownOpen.dateDay
                        ? "date-search__select-arrow--open"
                        : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {dropdownOpen.dateDay && (
                  <div className="date-search__select-dropdown">
                    {Array.from({ length: 31 }, (_, i) => (
                      <button
                        key={i + 1}
                        type="button"
                        className="date-search__select-option"
                        onClick={() => handleCustomDateChange("day", i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Year Dropdown */}
            <div className="date-search__field">
              <label className="date-search__label">Year:</label>
              <div className="date-search__custom-select">
                <button
                  type="button"
                  className="date-search__select-button"
                  onClick={() => toggleDropdown("dateYear")}
                >
                  {customDate.year ? customDate.year : "Select Year"}
                  <span
                    className={`date-search__select-arrow ${
                      dropdownOpen.dateYear
                        ? "date-search__select-arrow--open"
                        : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {dropdownOpen.dateYear && (
                  <div className="date-search__select-dropdown date-search__select-dropdown--scrollable">
                    {years.map((year) => (
                      <button
                        key={year}
                        type="button"
                        className="date-search__select-option"
                        onClick={() => handleCustomDateChange("year", year)}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="date-search__button">
            🚀 Explore This Date
          </button>
        </form>
      )}

      {searchType === "birthday" && (
        <form className="date-search__form" onSubmit={handleBirthdaySearch}>
          <div className="date-search__birthday-fields" ref={dropdownRef}>
            {/* Month Dropdown */}
            <div className="date-search__field">
              <label className="date-search__label">Month:</label>
              <div className="date-search__custom-select">
                <button
                  type="button"
                  className="date-search__select-button"
                  onClick={() => toggleDropdown("month")}
                >
                  {birthday.month ? months[birthday.month - 1] : "Select Month"}
                  <span
                    className={`date-search__select-arrow ${
                      dropdownOpen.month
                        ? "date-search__select-arrow--open"
                        : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {dropdownOpen.month && (
                  <div className="date-search__select-dropdown">
                    {months.map((month, index) => (
                      <button
                        key={index + 1}
                        type="button"
                        className="date-search__select-option"
                        onClick={() => handleBirthdayChange("month", index + 1)}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Day Dropdown */}
            <div className="date-search__field">
              <label className="date-search__label">Day:</label>
              <div className="date-search__custom-select">
                <button
                  type="button"
                  className="date-search__select-button"
                  onClick={() => toggleDropdown("day")}
                >
                  {birthday.day ? birthday.day : "Select Day"}
                  <span
                    className={`date-search__select-arrow ${
                      dropdownOpen.day ? "date-search__select-arrow--open" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {dropdownOpen.day && (
                  <div className="date-search__select-dropdown">
                    {Array.from({ length: 31 }, (_, i) => (
                      <button
                        key={i + 1}
                        type="button"
                        className="date-search__select-option"
                        onClick={() => handleBirthdayChange("day", i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Year Dropdown */}
            <div className="date-search__field">
              <label className="date-search__label">Year:</label>
              <div className="date-search__custom-select">
                <button
                  type="button"
                  className="date-search__select-button"
                  onClick={() => toggleDropdown("year")}
                >
                  {birthday.year ? birthday.year : "Select Year"}
                  <span
                    className={`date-search__select-arrow ${
                      dropdownOpen.year ? "date-search__select-arrow--open" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {dropdownOpen.year && (
                  <div className="date-search__select-dropdown date-search__select-dropdown--scrollable">
                    {years.map((year) => (
                      <button
                        key={year}
                        type="button"
                        className="date-search__select-option"
                        onClick={() => handleBirthdayChange("year", year)}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="date-search__button">
            🎂 Find My Birthday Space Photo
          </button>
        </form>
      )}

      {searchType === "zodiac" && (
        <ZodiacSearch
          onAPODFound={onAPODFound}
          onError={onError}
          onLoading={onLoading}
        />
      )}
    </section>
  );
}

export default DateSearch;
