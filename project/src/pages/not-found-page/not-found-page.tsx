import Logo from '../../components/logo/logo';

function NotFoundPage(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
      </header>

      <div style={{
        display: 'block',
        fontSize: '50px',
        position: 'absolute',
        top: '40%',
        left: '45%',
        marginRight: '-50%'}}
      >
        <p>404 Not found</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
