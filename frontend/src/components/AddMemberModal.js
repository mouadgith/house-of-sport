import { Modal, Button, List, Group, Text, Select } from '@mantine/core';
import { useState } from 'react';

export default function AddMemberModal({ opened, onClose, group, members, allMembers, allAssignedMemberIds, onAddMember, onRemoveMember }) {
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  // Filtrer les membres déjà dans un groupe (un seul groupe autorisé)
  const availableMembers = allMembers.filter(m => !allAssignedMemberIds.includes(m.id));

  const handleAdd = () => {
    const member = availableMembers.find(m => m.id === Number(selectedMemberId));
    if (member && group) {
      onAddMember(group.id, member);
      setSelectedMemberId(null);
    }
  };
  const handleRemove = (id) => {
    if (group) onRemoveMember(group.id, id);
  };

  if (!group) return null;
  return (
    <Modal opened={opened} onClose={onClose} title={`Ajouter/Retirer un membre à ${group.name}`}>
      <Select
        label="Ajouter un membre"
        placeholder="Choisir un membre"
        data={availableMembers.map(m => ({ value: m.id.toString(), label: `${m.name} (${m.email})` }))}
        value={selectedMemberId}
        onChange={setSelectedMemberId}
        mb="sm"
        withinPortal
      />
      <Button color="orange" fullWidth mb="md" onClick={handleAdd} disabled={!selectedMemberId}>
        Ajouter
      </Button>
      <List spacing="sm" mt="md">
        {members.map(m => (
          <List.Item key={m.id}>
            <Group position="apart">
              <Text>{m.name} ({m.email})</Text>
              <Button color="red" size="xs" variant="light" onClick={() => handleRemove(m.id)}>Retirer</Button>
            </Group>
          </List.Item>
        ))}
      </List>
    </Modal>
  );
} 