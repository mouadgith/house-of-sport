import { Card, Group, Text, Badge, Button } from '@mantine/core';
import { IconUsers, IconCalendar } from '@tabler/icons-react';

export default function GroupCard({ group, coach, setNotification, onViewMembers, onAddMember, onSchedule }) {
  return (
    <Card shadow="xs" radius="md" p="md" withBorder>
      <Group position="apart">
        <Text weight={600}>{group.name}</Text>
        <Badge color="orange">{group.members ? group.members.length : 0} membres</Badge>
      </Group>
      <Group mt="sm">
        <Button leftIcon={<IconUsers />} size="xs" color="orange" variant="light" onClick={() => onViewMembers(group)}>
          Voir la liste
        </Button>
        <Button leftIcon={<IconUsers />} size="xs" color="orange" variant="outline" onClick={() => onAddMember(group)}>
          Ajouter/Retirer un membre
        </Button>
        <Button leftIcon={<IconCalendar />} size="xs" color="blue" variant="light" onClick={() => onSchedule(group)}>
          Planifier créneaux
        </Button>
      </Group>
      {/* Affichage des créneaux réservés */}
      <Group mt="xs" spacing="xs">
        {group.slots.map(slot => (
          <Badge color="gray" key={slot.day + slot.hour}>{slot.day} {slot.hour}</Badge>
        ))}
      </Group>
    </Card>
  );
} 