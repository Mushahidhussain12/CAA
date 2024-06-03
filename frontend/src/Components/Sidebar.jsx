function Sidebar({ sidebarstate, setsidebarstate }) {
    //   function onclickHandler(liValue) {
    //     setsidebarstate(liValue);
    //     console.log(liValue);
    //   }
  
    return (
      <div
        class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sideBar"
        style={{ width: "220px",position:"fixed" }}
      >
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg class="bi pe-none me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span class="fs-4">BMS PROJECT</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item" onClick={() => setsidebarstate("flights")}>
            <a
              href="#"
              class={`nav-link ${sidebarstate === "flights" && "active"} text-white`}
              aria-current="page"
            >
              <svg class="bi pe-none me-2" width="16" height="30">
                <use xlinkHref="#home"></use>
              </svg>
              flights
            </a>
          </li>
          <li class="nav-item" onClick={() => setsidebarstate("airport")}>
            <a
              href="#"
              class={`nav-link ${sidebarstate === "airport" && "active"} text-white`}
              aria-current="page"
            >
              <svg class="bi pe-none me-2" width="16" height="30">
                <use xlinkHref="#home"></use>
              </svg>
              Airport
            </a>
          </li>
          <li class="nav-item" onClick={() => setsidebarstate("airline")}>
            <a
              href="#"
              class={`nav-link ${sidebarstate === "airline" && "active"} text-white`}
              aria-current="page"
            >
              <svg class="bi pe-none me-2" width="16" height="30">
                <use xlinkHref="#home"></use>
              </svg>
              Airline
            </a>
          </li>
          <li onClick={() => setsidebarstate("BayDisplay")}>
            <a
              href="#"
              class={`nav-link ${
                sidebarstate === "BayDisplay" && "active"
              } text-white`}
            >
              <svg class="bi pe-none me-2" width="16" height="30">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Bays
            </a>
          </li>
          <li onClick={() => setsidebarstate("schedule")}>
            <a
              href="#"
              class={`nav-link ${
                sidebarstate === "schedule" && "active"
              } text-white`}
            >
              <svg class="bi pe-none me-2" width="16" height="30">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Schedule
            </a>
          </li>
          <li class="nav-item" onClick={() => setsidebarstate("addAirport")}>
            <a
              href="#"
              class={`nav-link ${sidebarstate === "addAirport" && "active"} text-white`}
              aria-current="page"
            >
              <svg class="bi pe-none me-2" width="16" height="30">
                <use xlinkHref="#home"></use>
              </svg>
              Add Airport
            </a>
          </li>
          <li onClick={() => setsidebarstate("addAirline")}>
            <a
              href="#"
              class={`nav-link ${
                sidebarstate === "addAirline" && "active"
              } text-white`}
            >
              <svg class="bi pe-none me-2" width="16" height="30">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Add Airline
            </a>
          </li>
          <li onClick={() => setsidebarstate("BayAdd")}>
            <a
              href="#"
              class={`nav-link ${
                sidebarstate === "BayAdd" && "active"
              } text-white`}
            >
              <svg class="bi pe-none me-2" width="16" height="30">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Add Bay
            </a>
          </li>
         
        </ul>
        <hr />
        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/46/PrimeMinisterNawazSharif.jpg"
              alt=""
              width="32"
              height="32"
              class="rounded-circle me-2"
            />
            <strong>mushahid Hussain</strong>
          </a>
          {/* <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a class="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    );
  }
  
  export default Sidebar;
  