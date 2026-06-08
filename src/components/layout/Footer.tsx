import { type ReactNode } from "react";

export function Footer(): ReactNode {
  return (
    <footer className="pfooter-bar">
      <span className="ftxt">
        © {new Date().getFullYear()} Harshwardhan More
      </span>
      <div className="fstat">
        <div className="fdot" />
        Open to new opportunities
      </div>
    </footer>
  );
}
