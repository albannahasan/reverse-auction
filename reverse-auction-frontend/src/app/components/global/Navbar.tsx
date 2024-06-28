import Image from "next/image";
import Link from "next/link";

interface NavLink {
    title: string;
    href: string;
  }

  const data: NavLink[] = [
    {
        title: "Home",
        href: "/homepage",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Auction Lot",
      href: "/products",
    },
  ];
  
export default function Navbar() {

  return (
      <header className="text-sm py-2 md:px-16 px-6 border-b-0.5 dark:border-zinc-800 border-zinc-200 z-30 md:mb-12 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            {/* <Image src={Logo} width={35} height={35} alt="logo" /> */}
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

          <div className="flex items-center gap-x-4">
          </div>
        </div>
      </header>
  );
}