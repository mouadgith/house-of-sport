import { useState } from 'react';
import {
  Container,
  Paper,
  Avatar,
  Text,
  TextInput,
  Button,
  Group,
  Stack,
  Divider,
  PasswordInput,
  Alert,
  rem,
} from '@mantine/core';
import { IconLock, IconUser, IconMail, IconPhone, IconMapPin, IconAlertCircle } from '@tabler/icons-react';
import Profile from '../models/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

// Données de test - à remplacer par les données réelles de l'utilisateur connecté
const userProfile = new Profile(
  'USR' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  'John',
  'Doe',
  'john.doe@example.com',
  '+212612345678',
  '123 Rue Example, Ville',
);

const ProfilePage = () => {
  const [profile, setProfile] = useState(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleProfileUpdate = () => {
    // Ici, ajoutez la logique pour mettre à jour le profil
    setIsEditing(false);
    setSuccessMessage('Profil mis à jour avec succès');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    // Ici, ajoutez la logique pour changer le mot de passe
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setSuccessMessage('Mot de passe modifié avec succès');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Container size="md" py="xl">
      {successMessage && (
        <Alert
          color="green"
          title="Succès"
          mb="md"
          withCloseButton
          onClose={() => setSuccessMessage('')}
        >
          {successMessage}
        </Alert>
      )}

      <Paper radius="md" p="xl" withBorder>
        <Group position="center" mb="xl">
          <Avatar
            src={profile.avatar}
            size={120}
            radius={120}
            mx="auto"
          />
        </Group>

        <Stack spacing="md">
          <Group position="apart">
            <Text size="xl" weight={700}>
              Informations du profil
            </Text>
            <Button
              variant={isEditing ? "filled" : "outline"}
              color="orange"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Annuler' : 'Modifier'}
            </Button>
          </Group>

          <Divider />

          <Group grow>
            <TextInput
              label="Identifiant"
              value={profile.id}
              disabled
              icon={<IconUser size={rem(14)} />}
            />
            <TextInput
              label="Nom"
              value={profile.nom}
              disabled={!isEditing}
              icon={<IconUser size={rem(14)} />}
              onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
            />
            <TextInput
              label="Prénom"
              value={profile.prenom}
              disabled={!isEditing}
              icon={<IconUser size={rem(14)} />}
              onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
            />
          </Group>

          <TextInput
            label="Email"
            value={profile.email}
            disabled={!isEditing}
            icon={<IconMail size={rem(14)} />}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />

          <TextInput
            label="Numéro de téléphone"
            value={profile.numTel}
            disabled={!isEditing}
            icon={<IconPhone size={rem(14)} />}
            onChange={(e) => setProfile({ ...profile, numTel: e.target.value })}
          />

          <TextInput
            label="Adresse"
            value={profile.adresse}
            disabled={!isEditing}
            icon={<IconMapPin size={rem(14)} />}
            onChange={(e) => setProfile({ ...profile, adresse: e.target.value })}
          />

          {isEditing && (
            <Button
              color="orange"
              onClick={handleProfileUpdate}
              mt="md"
            >
              Enregistrer les modifications
            </Button>
          )}

          <Divider my="md" />

          <Group position="apart">
            <Text size="xl" weight={700}>
              Sécurité
            </Text>
            <Button
              variant={isChangingPassword ? "filled" : "outline"}
              color="orange"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword ? 'Annuler' : 'Changer le mot de passe'}
            </Button>
          </Group>

          {isChangingPassword && (
            <Stack spacing="md">
              <PasswordInput
                label="Mot de passe actuel"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                icon={<IconLock size={rem(14)} />}
              />
              <PasswordInput
                label="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={<IconLock size={rem(14)} />}
              />
              <PasswordInput
                label="Confirmer le nouveau mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<IconLock size={rem(14)} />}
              />
              {passwordError && (
                <Alert icon={<IconAlertCircle size={rem(16)} />} color="red">
                  {passwordError}
                </Alert>
              )}
              <Button
                color="orange"
                onClick={handlePasswordChange}
                mt="md"
              >
                Mettre à jour le mot de passe
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProfilePage; 