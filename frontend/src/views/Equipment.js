import { useState } from 'react';
import {
  Card,
  Text,
  Group,
  Badge,
  ActionIcon,
  Menu,
  Button,
  SimpleGrid,
  Modal,
  TextInput,
  NumberInput,
  Select,
  rem,
  MantineProvider,
} from '@mantine/core';
import { IconTreadmill,IconBarbellFilled  , IconPlus, IconEdit, IconTrash, IconSettings, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import Equipment from '../models/Equipment';
import { modals } from '@mantine/modals';
import { ModalsProvider } from '@mantine/modals';
import { Notifications, showNotification } from '@mantine/notifications';

const equipmentIcons = {
  dumbbell: IconBarbellFilled  ,
  treadmill: IconTreadmill  ,
  // Add more Tabler icons as needed
};

const initialEquipments = [
  new Equipment('1', 'Haltère', 'dumbbell', 20, 'Disponible', 2),
  new Equipment('2', 'Tapie roulant', 'treadmill', 10, 'Disponible', 1),
  // Add more sample equipment as needed
];

const theme = {
  primaryColor: 'orange',
  colors: {
    orange: [
      '#fff3e0',
      '#ffe0b2',
      '#ffcc80',
      '#ffb74d',
      '#ffa726',
      '#ff9800',
      '#f28705',
      '#fb8c00',
      '#f57c00',
      '#ef6c00',
    ],
  },
};

function EquipmentCard({ equipment, onEdit, onDelete, onAdd }) {
  const Icon = equipmentIcons[equipment.icon] || IconSettings;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: 280, background: '#f8f9fb', overflow: 'visible' }}>
      <Group position="apart" mb="xs">
        <Group>
          <Icon size={36} color="#f28705" />
          <div>
            <Text weight={600} size="lg">{equipment.name}</Text>
            <Text size="xs" color="dimmed">Équipement</Text>
          </div>
        </Group>
        <Menu position="bottom-end" shadow="md">
          <Menu.Target>
            <ActionIcon variant="light" color="orange">
              <IconSettings size={20} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconPlus size={16} />} onClick={() => onAdd(equipment)}>Ajouter</Menu.Item>
            <Menu.Item icon={<IconEdit size={16} />} onClick={() => onEdit(equipment)}>Modifier</Menu.Item>
            <Menu.Item
              icon={<IconTrash size={16} />}
              color="red"
              onClick={() => onDelete(equipment)}
            >
              Supprimer
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Group mt="md" mb="xs" spacing="xs">
        <Text size="xl" weight={700}>{equipment.total}</Text>
        <Text size="sm" color="dimmed">Total</Text>
      </Group>
      <Group spacing="xs">
        <Badge color={equipment.status === 'Disponible' ? 'green' : 'red'} leftSection={equipment.status === 'Disponible' ? <IconCheck size={rem(12)} /> : <IconAlertCircle size={rem(12)} />}>
          {equipment.status}
        </Badge>
        {equipment.damaged > 0 && (
          <Badge color="red" leftSection={<IconAlertCircle size={rem(12)} />}>
            {equipment.damaged} endommagé{equipment.damaged > 1 ? 's' : ''}
          </Badge>
        )}
      </Group>
    </Card>
  );
}

export default function EquipmentPage() {
  const [equipments, setEquipments] = useState(initialEquipments);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentEquipment, setCurrentEquipment] = useState(null);
  const [form, setForm] = useState({
    name: '',
    icon: 'dumbbell',
    total: 1,
    status: 'Disponible',
    damaged: 0,
  });

  const openAddModal = () => {
    setForm({ name: '', icon: 'dumbbell', total: 1, status: 'Disponible', damaged: 0 });
    setModalMode('add');
    setModalOpen(true);
  };
  const openEditModal = (equipment) => {
    setForm({
      name: equipment.name,
      icon: equipment.icon,
      total: equipment.total,
      status: equipment.status,
      damaged: equipment.damaged,
    });
    setCurrentEquipment(equipment);
    setModalMode('edit');
    setModalOpen(true);
  };
  const openDeleteModal = (equipment) => {
    modals.openConfirmModal({
      title: "Supprimer l'équipement",
      children: (
        <Text>
          Êtes-vous sûr de vouloir supprimer <b>{equipment.name}</b> ?
        </Text>
      ),
      labels: { confirm: 'Supprimer', cancel: 'Annuler' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setEquipments((prev) => prev.filter((e) => e.id !== equipment.id));
      },
    });
  };
  const handleAdd = () => {
    if (!form.name.trim()) {
      showNotification({
        title: 'Erreur',
        message: "Le nom de l'équipement est obligatoire",
        color: 'red',
      });
      return;
    }
    setEquipments([
      ...equipments,
      new Equipment(
        (Math.random() + 1).toString(36).substring(7),
        form.name,
        form.icon,
        form.total,
        form.status,
        form.damaged,
      ),
    ]);
    setModalOpen(false);
  };
  const handleEdit = () => {
    if (!form.name.trim()) {
      showNotification({
        title: 'Erreur',
        message: "Le nom de l'équipement est obligatoire",
        color: 'red',
      });
      return;
    }
    setEquipments(
      equipments.map((e) =>
        e.id === currentEquipment.id
          ? { ...e, ...form }
          : e
      )
    );
    setModalOpen(false);
  };
  const handleAddOne = (equipment) => {
    setEquipments(
      equipments.map((e) =>
        e.id === equipment.id ? { ...e, total: Number(e.total) + 1 } : e
      )
    );
  };

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications />
        <div className="container-fluid mb-4">
          <h1>Équipements</h1>
        </div>
        <div style={{ padding: 24 }}>
          <Button leftIcon={<IconPlus />} color="orange" mb="md" onClick={openAddModal}>
            Ajouter un équipement
          </Button>
          <SimpleGrid cols={3} spacing="lg" breakpoints={[{ maxWidth: 900, cols: 2 }, { maxWidth: 600, cols: 1 }]}> 
            {equipments.map((equipment) => (
              <EquipmentCard
                key={equipment.id}
                equipment={equipment}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onAdd={handleAddOne}
              />
            ))}
          </SimpleGrid>
        </div>
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalMode === 'add' ? 'Ajouter un équipement' : 'Modifier un équipement'}
          centered
        >
          <TextInput
            label="Nom de l'équipement"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            mb="sm"
          />
          <Select
            label="Icône"
            data={[
              { value: 'dumbbell', label: 'Haltère' },
              { value: 'treadmill', label: 'Tapie roulant' },
              // Add more icon options here
            ]}
            value={form.icon}
            onChange={(value) => setForm({ ...form, icon: value })}
            mb="sm"
          />
          <NumberInput
            label="Nombre total"
            value={form.total}
            min={1}
            onChange={(value) => setForm({ ...form, total: value })}
            mb="sm"
          />
          <Select
            label="Statut"
            data={['Disponible', 'Indisponible']}
            value={form.status}
            onChange={(value) => setForm({ ...form, status: value })}
            mb="sm"
          />
          <NumberInput
            label="Nombre endommagé"
            value={form.damaged}
            min={0}
            max={form.total}
            onChange={(value) => setForm({ ...form, damaged: value })}
            mb="sm"
          />
          <Group position="right">
            <Button color="orange" onClick={modalMode === 'add' ? handleAdd : handleEdit}>
              {modalMode === 'add' ? 'Ajouter' : 'Enregistrer'}
            </Button>
          </Group>
        </Modal>
      </ModalsProvider>
    </MantineProvider>
  );
}
