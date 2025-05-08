import React, { useState } from 'react';
import { SimpleGrid, Button, Group, Title, Modal, TextInput, Select, Notification } from '@mantine/core';
import { IconPlus, IconFileExport } from '@tabler/icons-react';
import CoachCard from '../components/CoachCard';
import MemberListModal from '../components/MemberListModal';
import AddMemberModal from '../components/AddMemberModal';
import ScheduleModal from '../components/ScheduleModal';

// Liste centrale des coachs (source de vérité)
const allCoaches = [
  { id: 1, name: 'Coach Amine', icon: '🧑‍🏫' },
  { id: 2, name: 'Coach Sarah', icon: '👩‍🏫' },
  { id: 3, name: 'Coach Mehdi', icon: '🧑‍💼' },
  { id: 4, name: 'Coach 4', icon: '🧑‍💼' },
];

// Liste centrale des membres (source de vérité)
const allMembers = [
  { id: 1, name: 'Yassine', email: 'yassine@mail.com' },
  { id: 2, name: 'Fatima', email: 'fatima@mail.com' },
  { id: 3, name: 'Omar', email: 'omar@mail.com' },
  { id: 4, name: 'Sami', email: 'sami@mail.com' },
  { id: 5, name: 'Nora', email: 'nora@mail.com' },
  { id: 6, name: 'Lina', email: 'lina@mail.com' },
];

// L'état coaches ne contient que les groupes associés à chaque coach
const initialCoaches = allCoaches.map(coach => ({
  ...coach,
  groups: coach.id === 1 ? [
    { id: 1, name: 'Groupe A', members: [
      { id: 1, name: 'Yassine', email: 'yassine@mail.com' },
      { id: 2, name: 'Fatima', email: 'fatima@mail.com' }
    ], slots: [{ day: 'Lundi', hour: '18:00', duration: 1 }, { day: 'Jeudi', hour: '19:00', duration: 1.5 }] },
    { id: 2, name: 'Groupe B', members: [
      { id: 3, name: 'Omar', email: 'omar@mail.com' }
    ], slots: [] }
  ] : []
}));

export default function CoachesGroups() {
  const [coaches, setCoaches] = useState(initialCoaches);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [notification, setNotification] = useState(null);

  // Pour la modale d'ajout de groupe
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCoachId, setNewGroupCoachId] = useState(null);

  // Modales de gestion
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [modalType, setModalType] = useState(null); // 'list' | 'add' | 'schedule'

  // Modale de réattribution
  const [showReassign, setShowReassign] = useState(false);
  const [reassignCoachId, setReassignCoachId] = useState(null);
  const [reassignGroupId, setReassignGroupId] = useState(null);
  const [reassignTargetCoachId, setReassignTargetCoachId] = useState(null);

  const openModal = (group, type) => {
    setSelectedGroup(group);
    setModalType(type);
  };
  const closeModal = () => {
    setSelectedGroup(null);
    setModalType(null);
  };

  // Ajout/suppression de membres
  const handleAddMember = (groupId, member) => {
    setCoaches(coaches => coaches.map(coach => ({
      ...coach,
      groups: coach.groups.map(g =>
        g.id === groupId ? { ...g, members: [...g.members, member] } : g
      )
    })));
    setSelectedGroup(g => g && g.id === groupId ? { ...g, members: [...g.members, member] } : g);
  };
  const handleRemoveMember = (groupId, memberId) => {
    setCoaches(coaches => coaches.map(coach => ({
      ...coach,
      groups: coach.groups.map(g =>
        g.id === groupId ? { ...g, members: g.members.filter(m => m.id !== memberId) } : g
      )
    })));
    setSelectedGroup(g => g && g.id === groupId ? { ...g, members: g.members.filter(m => m.id !== memberId) } : g);
  };

  // Ajout/suppression de créneaux
  const handleAddSlot = (groupId, slot) => {
    setCoaches(coaches => coaches.map(coach => ({
      ...coach,
      groups: coach.groups.map(g =>
        g.id === groupId ? { ...g, slots: [...g.slots, slot] } : g
      )
    })));
    setSelectedGroup(g => g && g.id === groupId ? { ...g, slots: [...g.slots, slot] } : g);
  };
  const handleRemoveSlot = (groupId, slot) => {
    setCoaches(coaches => coaches.map(coach => ({
      ...coach,
      groups: coach.groups.map(g =>
        g.id === groupId ? { ...g, slots: g.slots.filter(s => !(s.day === slot.day && s.hour === slot.hour && s.duration === slot.duration)) } : g
      )
    })));
    setSelectedGroup(g => g && g.id === groupId ? { ...g, slots: g.slots.filter(s => !(s.day === slot.day && s.hour === slot.hour && s.duration === slot.duration)) } : g);
  };

  // Ajout d'un groupe à un coach
  const handleAddGroup = () => {
    if (!newGroupName || !newGroupCoachId) return;
    setCoaches(coaches =>
      coaches.map(coach =>
        coach.id === Number(newGroupCoachId)
          ? {
              ...coach,
              groups: [
                ...coach.groups,
                {
                  id: Date.now(),
                  name: newGroupName,
                  members: [],
                  slots: [],
                },
              ],
            }
          : coach
      )
    );
    setShowAddGroup(false);
    setNewGroupName('');
    setNewGroupCoachId(null);
  };

  // Ouvre la modale de réattribution pour un coach donné
  const handleOpenReassign = (coachId) => {
    setReassignCoachId(coachId);
    setReassignGroupId(null);
    setReassignTargetCoachId(null);
    setShowReassign(true);
  };

  // Réattribue le groupe sélectionné au coach cible
  const handleReassignGroup = () => {
    if (!reassignCoachId || !reassignGroupId || !reassignTargetCoachId) return;
    let groupToMove = null;
    setCoaches(coaches => {
      // Retirer le groupe du coach source
      let updated = coaches.map(coach => {
        if (coach.id === reassignCoachId) {
          const group = coach.groups.find(g => g.id === Number(reassignGroupId));
          groupToMove = group;
          return { ...coach, groups: coach.groups.filter(g => g.id !== Number(reassignGroupId)) };
        }
        return coach;
      });
      // Ajouter le groupe au coach cible
      if (groupToMove) {
        updated = updated.map(coach =>
          coach.id === Number(reassignTargetCoachId)
            ? { ...coach, groups: [...coach.groups, groupToMove] }
            : coach
        );
      }
      return updated;
    });
    setShowReassign(false);
    setReassignCoachId(null);
    setReassignGroupId(null);
    setReassignTargetCoachId(null);
  };

  // Calcule la liste de tous les membres déjà dans un groupe
  const allAssignedMemberIds = coaches.flatMap(coach =>
    coach.groups.flatMap(group => group.members.map(m => m.id))
  );

  return (
    <div style={{ padding: 32 }}>
      <Group position="apart" mb="md">
        <Title order={2}>Gestion des Coachs & Groupes</Title>
        <Group>
          <Button leftIcon={<IconPlus />} color="orange" onClick={() => setShowAddGroup(true)}>
            Ajouter un groupe
          </Button>
        </Group>
      </Group>
      <SimpleGrid cols={3} spacing="lg" breakpoints={[{ maxWidth: 900, cols: 1 }]}> 
        {allCoaches.map(coach => (
          <CoachCard
            key={coach.id}
            coach={{ ...coach, groups: (coaches.find(c => c.id === coach.id)?.groups || []) }}
            setNotification={setNotification}
            onViewMembers={group => openModal(group, 'list')}
            onAddMember={group => openModal(group, 'add')}
            onSchedule={group => openModal(group, 'schedule')}
            onReassign={() => handleOpenReassign(coach.id)}
          />
        ))}
      </SimpleGrid>
      <Modal opened={showAddGroup} onClose={() => setShowAddGroup(false)} title="Ajouter un groupe à un coach">
        <TextInput label="Nom du groupe" mb="md" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} />
        <Select
          label="Coach"
          data={allCoaches.map(c => ({ value: c.id.toString(), label: c.name }))}
          mb="md"
          value={newGroupCoachId}
          onChange={setNewGroupCoachId}
          withinPortal
        />
        <Button color="orange" fullWidth onClick={handleAddGroup}>Ajouter</Button>
      </Modal>
      <Modal opened={showReassign} onClose={() => setShowReassign(false)} title="Réattribuer un groupe">
        <Select
          label="Groupe à réattribuer"
          data={(() => {
            const coach = coaches.find(c => c.id === reassignCoachId);
            return coach ? coach.groups.map(g => ({ value: g.id.toString(), label: g.name })) : [];
          })()}
          value={reassignGroupId}
          onChange={setReassignGroupId}
          mb="md"
          withinPortal
        />
        <Select
          label="Nouveau coach"
          data={allCoaches.filter(c => c.id !== reassignCoachId).map(c => ({ value: c.id.toString(), label: c.name }))}
          value={reassignTargetCoachId}
          onChange={setReassignTargetCoachId}
          mb="md"
          withinPortal
        />
        <Button color="orange" fullWidth onClick={handleReassignGroup} disabled={!reassignGroupId || !reassignTargetCoachId}>Réattribuer</Button>
      </Modal>
      {notification && (
        <Notification color="red" onClose={() => setNotification(null)}>
          {notification}
        </Notification>
      )}
      <MemberListModal opened={modalType === 'list'} onClose={closeModal} group={selectedGroup} members={selectedGroup?.members || []} />
      <AddMemberModal
        opened={modalType === 'add'}
        onClose={closeModal}
        group={selectedGroup}
        members={selectedGroup?.members || []}
        allMembers={allMembers}
        allAssignedMemberIds={allAssignedMemberIds}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />
      <ScheduleModal opened={modalType === 'schedule'} onClose={closeModal} group={selectedGroup} slots={selectedGroup?.slots || []} onAddSlot={handleAddSlot} onRemoveSlot={handleRemoveSlot} />
    </div>
  );
} 