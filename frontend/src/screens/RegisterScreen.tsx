import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toast } from 'react-toastify';
import { registerUser } from '../slices/usersSlice';

const RegisterScreen = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confrimPassword, setConfrimPassword] = useState<string>('');

  const { loading, error, user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confrimPassword) {
      toast.error('passwords do not match');
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && !loading && (
        <Alert variant="danger">{JSON.stringify(error)}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Confirm Password"
            value={confrimPassword}
            onChange={(e) => setConfrimPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {loading ? (
          <Spinner />
        ) : (
          <Button type="submit" variant="primary" className="mt-3">
            Sign Up
          </Button>
        )}
      </Form>
      <Row>
        <Col>
          Already have an account ? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterScreen;
