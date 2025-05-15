import Image from "next/image";
import Link from "next/link";

interface NavLink {
    title: string;
    href: string;
  }

  const data: NavLink[] = [
    {
        title: "products",
        href: "/products",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Cart",
      href: "/products",
    },
  ];
  
export default function Navbar() {

  return (
      <header className="text-sm py-4 mx-auto md:px-16 px-6 border-b-0.5 dark:border-zinc-800z-30 bg-white md:mb-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between ">
          <Link href="/homepage">
              LOGO HERE
          </Link>

          <nav className="md:block hidden">
           
            <ul className="flex items-center gap-x-8">
              {data.map((link, id) => (
                <li key={id}>
                  <Link
                    href={link.href}
                    className="font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </header>
  );
}