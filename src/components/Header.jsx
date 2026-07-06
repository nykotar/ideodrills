import { FaGithub, FaDiscord, FaReddit } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/useTheme";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-hairline">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <a
          href="/ideodrills"
          className="text-sm font-semibold tracking-[0.2em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          IdeoDrills
        </a>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-5 text-lg text-ink">
            <li className="flex items-center">
              <a href="https://ko-fi.com/V7V53DIM0" target="_blank" rel="noreferrer">
                <img
                  height="24"
                  style={{ border: "0px", height: "24px" }}
                  src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
                  border="0"
                  alt="Buy Me a Coffee at ko-fi.com"
                />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nykotar/ideodrills"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-muted"
              >
                <FaGithub />
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/remoteviewing"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="hover:text-muted"
              >
                <FaDiscord />
              </a>
            </li>
            <li>
              <a
                href="https://reddit.com/r/remoteviewing"
                target="_blank"
                rel="noreferrer"
                aria-label="Reddit"
                className="hover:text-muted"
              >
                <FaReddit />
              </a>
            </li>
          </ul>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
