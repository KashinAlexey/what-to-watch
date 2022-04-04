type SignInErrorsProps = {
  errorType: string;
}

const ERROR_TYPE = {
  email: 'email',
  signIn: 'signIn',
};

function SignInErrors(props: SignInErrorsProps): JSX.Element {
  const {errorType} = props;

  const getErrorText = (errType: string) => {
    let errText;

    switch (errType) {
      case ERROR_TYPE.email:
        errText = <p>Please enter a valid email address</p>;
        break;
      case ERROR_TYPE.signIn:
        errText = <p>We can’t recognize this email <br></br> and password combination. Please try again.</p>;
        break;
    }

    return errText;
  };

  return (
    <div className="sign-in__message">
      {getErrorText(errorType)}
    </div>
  );
}

export default SignInErrors;
