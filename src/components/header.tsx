export type HeaderProps = { heading: string };

export const Header = ({ heading }: HeaderProps) => (
  <>
    <h2>
      Next.js 14 <small>(app directory)</small> - i18next
      <hr />
    </h2>
    <h1>{heading}</h1>
    <a className="github" href="//github.com/i18next/i18next">
      GitHub
    </a>
  </>
);
