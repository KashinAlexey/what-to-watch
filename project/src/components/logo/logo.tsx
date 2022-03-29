import { Link } from 'react-router-dom';

type LogoProps = {
  subClassName?: string;
}

function Logo(props: LogoProps): JSX.Element {
  const {subClassName} = props;

  return (
    <div className="logo">
      <Link to="/" className={`logo__link ${subClassName}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
