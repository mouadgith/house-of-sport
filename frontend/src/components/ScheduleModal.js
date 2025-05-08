import { Modal, Group, Button, Select, Text, Badge } from '@mantine/core';
import { useState } from 'react';

const days = [
  { value: 'Lundi', label: 'Lundi' },
  { value: 'Mardi', label: 'Mardi' },
  { value: 'Mercredi', label: 'Mercredi' },
  { value: 'Jeudi', label: 'Jeudi' },
  { value: 'Vendredi', label: 'Vendredi' },
  { value: 'Samedi', label: 'Samedi' },
  { value: 'Dimanche', label: 'Dimanche' },
];
const hours = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30',
];
const durations = [
  { value: 1, label: '1h' },
  { value: 1.5, label: '1h30' },
  { value: 2, label: '2h' },
  { value: 2.5, label: '2h30' },
  { value: 3, label: '3h' },
  { value: 3.5, label: '3h30' },
  { value: 4, label: '4h' },
];

export default function ScheduleModal({ opened, onClose, group, slots, onAddSlot, onRemoveSlot }) {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const handleAddSlot = () => {
    if (
      selectedDay &&
      selectedHour &&
      selectedDuration &&
      group &&
      !slots.find(s => s.day === selectedDay && s.hour === selectedHour && s.duration === selectedDuration)
    ) {
      onAddSlot(group.id, { day: selectedDay, hour: selectedHour, duration: selectedDuration });
      setSelectedDay('');
      setSelectedHour('');
      setSelectedDuration('');
    }
  };
  const handleRemoveSlot = (slot) => {
    if (group) onRemoveSlot(group.id, slot);
  };

  if (!group) return null;
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Planifier créneaux pour ${group.name}`}
      style={{ overflow: 'visible' }}
    >
      <Group mb="md" align="flex-end">
        <Select
          label="Jour"
          data={days}
          value={selectedDay}
          onChange={setSelectedDay}
          style={{ flex: 1 }}
          zIndex={3000}
          withinPortal={true}
        />
        <Select
          label="Heure de début"
          data={hours.map(h => ({ value: h, label: h }))}
          value={selectedHour}
          onChange={setSelectedHour}
          style={{ flex: 1 }}
          zIndex={3000}
          withinPortal={true}
        />
        <Select
          label="Durée"
          data={durations}
          value={selectedDuration}
          onChange={setSelectedDuration}
          style={{ flex: 1 }}
          zIndex={3000}
          withinPortal={true}
        />
        <Button color="orange" onClick={handleAddSlot}>Ajouter</Button>
      </Group>
      <Text weight={500} mb="xs">Créneaux réservés :</Text>
      <Group spacing="xs">
        {slots.length === 0 && <Text color="dimmed">Aucun créneau</Text>}
        {slots.map(slot => (
          <Badge key={slot.day + slot.hour + slot.duration} color="gray" rightSection={<span style={{ cursor: 'pointer' }} onClick={() => handleRemoveSlot(slot)}>×</span>}>
            {slot.day} {slot.hour} ({durations.find(d => d.value === Number(slot.duration))?.label || slot.duration + 'h'})
          </Badge>
        ))}
      </Group>
    </Modal>
  );
} 