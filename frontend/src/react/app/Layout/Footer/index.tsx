import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="copyright">
          Copyright Vladyslav Geyna {new Date().getFullYear()}
        </div>
        <a
          target="_blank"
          href="https://github.com/vladyslavgeyna/auto-sale"
          className="source"
        >
          <span>GitHub</span> <FaGithub />
        </a>
      </div>
    </div>
  );
};
