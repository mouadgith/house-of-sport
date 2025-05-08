import { useState } from 'react';
import {
  Table,
  Badge,
  Button,
  Group,
  ActionIcon,
  Text,
  MantineProvider,
  Tooltip,
  Modal,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core';
import { IconCheck, IconBan, IconX, IconCash, IconEdit, IconSearch } from '@tabler/icons-react';

const initialPayments = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+212612345678',
    amount: 0,
    paid: true,
    subscription: 'Annuel',
  },
  {
    id: '2',
    name: 'Fatima Zahra',
    phone: '+212698765432',
    amount: 300,
    paid: false,
    subscription: 'Mois',
  },
  {
    id: '3',
    name: 'Ali Bennani',
    phone: '+212612398765',
    amount: 0,
    paid: true,
    subscription: 'Trimestriel',
  },
  // Add more members as needed
];

const subscriptionColors = {
  Mois: 'blue',
  Annuel: 'orange',
  Trimestriel: 'teal',
  Aucun: 'gray',
};

const subscriptionOptions = [
  { value: 'Mois', label: 'Mois' },
  { value: 'Annuel', label: 'Annuel' },
  { value: 'Trimestriel', label: 'Trimestriel' },
  { value: 'Aucun', label: 'Aucun' },
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

export default function PaiementPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [editAmount, setEditAmount] = useState(0);
  const [editSubscription, setEditSubscription] = useState('Mois');
  const [search, setSearch] = useState('');
  const [filterSubscription, setFilterSubscription] = useState('');

  // Actions
  const approvePayment = (id) => {
    setPayments((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, paid: true, amount: 0 } : m
      )
    );
  };
  const banMember = (id) => {
    setPayments((prev) => prev.filter((m) => m.id !== id));
  };
  const cancelSubscription = (id) => {
    setPayments((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, subscription: 'Aucun', amount: 0, paid: true } : m
      )
    );
  };
  const openEditModal = (member) => {
    setEditMember(member);
    setEditAmount(member.amount);
    setEditSubscription(member.subscription);
    setEditModalOpen(true);
  };
  const handleEditSave = () => {
    setPayments((prev) =>
      prev.map((m) =>
        m.id === editMember.id
          ? {
              ...m,
              amount: Number(editAmount),
              subscription: editSubscription,
              paid: Number(editAmount) === 0 ? true : false,
            }
          : m
      )
    );
    setEditModalOpen(false);
  };

  // Filtrage dynamique
  const filteredPayments = payments.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.phone.toLowerCase().includes(search.toLowerCase());
    const matchesSubscription =
      !filterSubscription || member.subscription === filterSubscription;
    return matchesSearch && matchesSubscription;
  });

  return (
    <MantineProvider theme={theme}>
      <div className="container-fluid mb-4">
        <h1>Paiements des membres</h1>
      </div>
      <div style={{ padding: 24 }}>
        <Group mb="md" spacing="md" align="flex-end">
          <TextInput
            icon={<IconSearch size={16} />}
            placeholder="Rechercher par nom ou téléphone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: 250 }}
          />
          <Select
            label="Filtrer par abonnement"
            placeholder="Tous"
            data={subscriptionOptions}
            value={filterSubscription}
            onChange={setFilterSubscription}
            clearable
            style={{ minWidth: 200 }}
          />
        </Group>
        <Table
          highlightOnHover
          verticalSpacing="md"
          striped
          withBorder
          style={{ borderRadius: 12, overflow: 'hidden', background: '#f8f9fb' }}
        >
          <thead>
            <tr>
              <th>Membre</th>
              <th>Téléphone</th>
              <th>Montant</th>
              <th>Abonnement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((member) => (
              <tr key={member.id}>
                <td>
                  <Text weight={500}>{member.name}</Text>
                </td>
                <td>
                  <Text color="dimmed">{member.phone}</Text>
                </td>
                <td>
                  {member.paid ? (
                    <Badge color="green" variant="light">
                      0 DH
                    </Badge>
                  ) : (
                    <Badge color="red" variant="filled">
                      {member.amount} DH
                    </Badge>
                  )}
                </td>
                <td>
                  <Badge color={subscriptionColors[member.subscription] || 'gray'}>
                    {member.subscription}
                  </Badge>
                </td>
                <td>
                  <Group spacing="xs">
                    <Tooltip label="Modifier">
                      <ActionIcon color="blue" onClick={() => openEditModal(member)}>
                        <IconEdit size={18} />
                      </ActionIcon>
                    </Tooltip>
                    {!member.paid && (
                      <Tooltip label="Valider le paiement">
                        <ActionIcon color="green" onClick={() => approvePayment(member.id)}>
                          <IconCash size={18} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                    <Tooltip label="Bannir le membre">
                      <ActionIcon color="red" onClick={() => banMember(member.id)}>
                        <IconBan size={18} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Annuler l'abonnement">
                      <ActionIcon color="orange" onClick={() => cancelSubscription(member.id)}>
                        <IconX size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={`Modifier le paiement de ${editMember?.name || ''}`}
        centered
      >
        <NumberInput
          label="Montant à payer (DH)"
          value={editAmount}
          min={0}
          onChange={setEditAmount}
          mb="md"
        />
        <Select
          label="Type d'abonnement"
          data={subscriptionOptions}
          value={editSubscription}
          onChange={setEditSubscription}
          mb="md"
          withinPortal={false}
          zIndex={1000}
        />
        <Group position="right">
          <Button color="orange" onClick={handleEditSave}>
            Enregistrer
          </Button>
        </Group>
      </Modal>
    </MantineProvider>
  );
}
