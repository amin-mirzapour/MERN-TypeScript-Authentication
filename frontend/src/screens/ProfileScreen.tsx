import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toast } from 'react-toastify';
import { updateUser } from '../slices/usersSlice';

const ProfileScreen = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confrimPassword, setConfrimPassword] = useState<string>('');

  const { loading, error, user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confrimPassword) {
      toast.error('passwords do not match');
    } else {
      dispatch(updateUser({ _id: user?._id, name, email, password }));
    }
  };

  return (
    <FormContainer>
      <h1>Profile</h1>
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
            Update
          </Button>
        )}
      </Form>
    </FormContainer>
  );
};
export default ProfileScreen;
