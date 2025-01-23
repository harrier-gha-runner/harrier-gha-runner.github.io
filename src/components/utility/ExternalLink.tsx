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
    className="text-harrierLINKBLUE underline underline-offset-2"
  >
    {children}
  </a>
);
