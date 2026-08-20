import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="flex items-center gap-6 px-6 py-4 sm:px-16">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="text-sm font-medium">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
