import classNames from "classnames";

import { rajdhani } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "Fala Português!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen bg-gradient-to-b from-slate-700 to-slate-800">
          <div className="flex flex-col h-full overflow-hidden">
            <header
              className={classNames(
                rajdhani.className,
                "text-2xl absolute w-full text-center text-white mt-6"
              )}
            >
              Fala português…
            </header>

            <main className="transition-all flex flex-auto flex-col justify-center items-center text-white">
              {children}
            </main>

            <footer className="flex justify-between text-sm text-white bg-slate-900 px-12 py-8">
              <span>
                Created by{" "}
                <Link href="https://www.github.com/jmoicano">@JMoicano</Link>,{" "}
                <Link href="https://www.github.com/savioserra">
                  @savioserra
                </Link>{" "}
                and <Link href="https://github.com/jlhmtt">@Juli</Link>.
              </span>

              <span>☭</span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

const Link = ({ children, ...props }) => {
  return (
    <a className="text-cyan-600" {...props}>
      {children}
    </a>
  );
};
