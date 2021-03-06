import Logo from '../../components/logo/logo';

function Footer(): JSX.Element {
  return (
    <footer className="page-footer">
      <Logo subClassName={'logo__link--light'}/>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
