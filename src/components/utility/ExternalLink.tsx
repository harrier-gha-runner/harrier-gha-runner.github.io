export const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-harrierLINKBLUE no-underline hover:underline hover:underline-offset-2"
  >
    {children}
  </a>
);
