import { Modal, List, Text, Badge } from '@mantine/core';

export default function MemberListModal({ opened, onClose, group, members }) {
  if (!group) return null;
  return (
    <Modal opened={opened} onClose={onClose} title={`Membres de ${group.name}`}>
      <List spacing="sm">
        {members.map(m => (
          <List.Item key={m.id}>
            <Text weight={500}>{m.name}</Text>
            <Badge color="gray" ml="sm">{m.email}</Badge>
          </List.Item>
        ))}
      </List>
    </Modal>
  );
} 