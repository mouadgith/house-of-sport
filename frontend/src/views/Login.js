import React, { useState } from 'react';
import loginImage from '../images/login.png';
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Text,
  Anchor,
  Center,
  Box,
  MantineProvider,
} from '@mantine/core';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const illustrationUrl = loginImage;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add real authentication logic here
    login();
    navigate('/');
  };

  return (
    <MantineProvider theme={{ primaryColor: 'orange' }}>
      <Box style={{ minHeight: '100%', background: '#f6f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper radius={24} shadow="xl" style={{ display: 'flex', width: 900, minHeight: 500, overflow: 'hidden' }}>
          {/* Left Side - Form */}
          <Box style={{ flex: 1, padding: 48, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Text size="lg" weight={700} mb={8} color="#f28705">
              House of SPORT
            </Text>
            <Text size="xl" weight={700} mb={8}>
              Bienvenue
            </Text>
            <Text color="dimmed" mb={32}>
              Hey, bienvenue à votre place de sport spéciale
            </Text>
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Email"
                placeholder="stanley@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                mb={16}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                mb={8}
              />
              <Group position="apart" mb={24} mt={8}>
                <Checkbox
                  label="Remember me"
                  checked={remember}
                  onChange={(event) => setRemember(event.currentTarget.checked)}
                />
                <Anchor href="#" size="sm" color="#f28705">
                  Mot de passe oublié ?
                </Anchor>
              </Group>
              <Button type="submit" fullWidth color="#f28705" size="md" radius="md">
                Sign In
              </Button>
            </form>
          </Box>
          {/* Right Side - Illustration */}
          <Box style={{ flex: 1, background: 'linear-gradient(135deg,rgb(250, 204, 151) 0%,rgba(253, 150, 54, 0.77) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <img
              src={illustrationUrl}
              alt="Login Illustration"
              style={{ width: '100%', maxWidth: 350, borderRadius: 24 }}
            />
          </Box>
        </Paper>
      </Box>
    </MantineProvider>
  );
} 