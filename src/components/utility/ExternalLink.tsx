type ExternalLinkProps = {
  href: string;
  children: string;
  color?: string;
};

export const ExternalLink = ({ href, children, color }: ExternalLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${color ? color : "text-harrierLINKBLUE"} no-underline hover:underline hover:underline-offset-2`}
  >
    {children}
  </a>
);
