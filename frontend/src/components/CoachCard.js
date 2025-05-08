import { Card, Text, Group, Button, Divider, Stack } from '@mantine/core';
import { IconTransfer } from '@tabler/icons-react';
import GroupCard from './GroupCard';

export default function CoachCard({ coach, setNotification, onViewMembers, onAddMember, onSchedule, onReassign }) {
  return (
    <Card shadow="md" radius="lg" p="lg" withBorder style={{ minHeight: 300 }}>
      <Group position="apart">
        <Text size="xl" weight={700}>{coach.icon} {coach.name}</Text>
        <Button variant="subtle" leftIcon={<IconTransfer />} color="blue" size="xs" onClick={onReassign}>
          Réattribuer un groupe
        </Button>
      </Group>
      <Divider my="sm" />
      <Stack spacing="sm">
        {coach.groups.map(group => (
          <GroupCard
            key={group.id}
            group={group}
            coach={coach}
            setNotification={setNotification}
            onViewMembers={onViewMembers}
            onAddMember={onAddMember}
            onSchedule={onSchedule}
          />
        ))}
      </Stack>
    </Card>
  );
} 