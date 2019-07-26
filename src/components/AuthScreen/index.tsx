import MaterialButton from '@material-ui/core/Button';
import MaterialTextField from '@material-ui/core/TextField';
import React from 'react';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { signIn } from '../../services/auth.service';
import { RouteComponentProps } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
  background: radial-gradient(rgb(34, 65, 67), rgb(17, 48, 50)),
    url(/assets/chat-background.jpg) no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
  color: white;
`;

const Intro = styled.div`
  height: 265px;
`;

const Icon = styled.img`
  width: 125px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  padding-top: 70px;
  display: block;
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
  color: white;
`;

const Alternative = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;

  a {
    color: var(--secondary-bg);
  }
`;

const SignInForm = styled.div`
  height: calc(100% - 265px);
`;

const ActulaForm = styled.form`
  padding: 20px;
`;

const Section = styled.div`
  width: 100%;
  padding-bottom: 35px;
`;

const Legend = styled.legend`
  font-weight: bold;
  color: white;
`;

const Label = styled.label`
  color: white !important;
`;

const Input = styled.input`
  color: white;

  &::placeholder {
    color: var(--primary-bg);
  }
`;

const TextField = styled(MaterialTextField)`
  width: 100%;
  position: relative;

  > div::before {
    border-color: white !important;
  }

  input {
    color: white !important;

    &::placeholder {
      color: var(--primary-bg) !important;
    }
  }

  label {
    color: white !important;
  }
`;

const Button = styled(MaterialButton)`
  width: 100px;
  display: block !important;
  margin: auto !important;
  background-color: var(--secondary-bg) !important;

  &[disabled] {
    color: #38a81c;
  }

  &:not([disabled]) {
    color: white;
  }
`;

const AuthScreen: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [userId, setUserId] = useState('');

  const onUserIdChange = useCallback(({ target }) => {
    setUserId(target.value);
  }, []);

  const maySignIn = useCallback(() => {
    return !!userId;
  }, [userId]);

  const handleSignIn = useCallback(() => {
    signIn(userId).then(() => {
      history.replace('/chats');
    });
  }, [userId, history]);

  return (
    <Container>
      <Intro>
        <Icon src="assets/whatsapp-icon.png" className="AuthScreen-icon" />
        <Title className="AuthScreen-title">WhatsApp by peo</Title>
      </Intro>
      <SignInForm>
        <ActulaForm>
          <Legend>Sign In</Legend>
          <Section>
            <TextField
              data-testid="user-id-input"
              label="UserID"
              value={userId}
              onChange={onUserIdChange}
              margin="normal"
              placeholder="Enter current user ID"
            />
          </Section>
          <Button
            data-testid="sign-in-button"
            type="button"
            color="secondary"
            variant="contained"
            disabled={!maySignIn()}
            onClick={handleSignIn}>
            Sign In
          </Button>
        </ActulaForm>
      </SignInForm>
    </Container>
  );
};

export default AuthScreen;
