export function DonateButton({color, id, label, icon, patreon = false}) {
    return (
        <div className="btn-container">
            <a
                title={label}
                className="kofi-button"
                style={{backgroundColor: color}}
                href={(patreon ? "https://patreon.com/" : "https://ko-fi.com/") + id}
                target="_blank"
                rel="noopener noreferrer"
            >
        <span className="kofitext">
          <img
              src={icon || "https://ko-fi.com/img/cup-border.png"}
              className="kofiimg"
              alt="button-icon"/>
            {label}
        </span>
            </a>
        </div>
    );
}
