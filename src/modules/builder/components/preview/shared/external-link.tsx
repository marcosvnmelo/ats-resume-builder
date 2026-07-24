interface ExternalLinkProps extends React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {
  href: string;
}

export function ExternalLink({ href, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href.replace(/^(https?:\/\/)?(.+)/, 'https://$2')}
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  );
}
