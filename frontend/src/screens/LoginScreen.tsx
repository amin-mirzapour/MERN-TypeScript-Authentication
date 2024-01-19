import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../slices/usersSlice';
const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { loading, error, user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        {error && !loading && (
          <Alert variant="danger">{JSON.stringify(error)}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {loading ? (
            <Spinner />
          ) : (
            <Button type="submit" variant="primary" className="mt-3">
              Sign In
            </Button>
          )}
        </Form>
        <Row>
          <Col>
            New Customer ? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};
export default LoginScreen;
