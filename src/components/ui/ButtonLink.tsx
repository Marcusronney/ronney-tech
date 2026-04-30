import Link from "next/link";

type ButtonLinkProps = { href: string; children: React.ReactNode };

export default function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <Link href={href} className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
      {children}
    </Link>
  );
}
