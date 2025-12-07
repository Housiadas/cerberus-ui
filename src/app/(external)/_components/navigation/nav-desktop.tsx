import Link from "next/link";

export function NavDesktop() {
  return (
    <div className="hidden items-center space-x-8 md:flex">
      <Link prefetch={false} href="/price" className="text-gray-400 transition-colors hover:text-white">
        Pricing
      </Link>
      <Link prefetch={false} href="/about" className="text-gray-400 transition-colors hover:text-white">
        About
      </Link>
    </div>
  );
}
