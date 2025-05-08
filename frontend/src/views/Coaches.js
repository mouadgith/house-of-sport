import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { ActionIcon, Button, Flex, Text, Tooltip, MantineProvider } from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Coach from '../models/Coach';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';

// Sample data - replace with your actual data source
const fakeData = [
  {
    id: '1',
    nom: 'Ali',
    prenom: 'Bennani',
    tel: '+212612345678',
    adresse: '456 Rue Sport, Casablanca',
    sexe: 'M',
    dateNaissance: '1985-05-10',
  },
  // Add more sample data as needed
];

// Configuration du thème
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
      '#f28705', // Notre couleur primaire
      '#fb8c00',
      '#f57c00',
      '#ef6c00',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        color: 'orange',
      },
    },
    ActionIcon: {
      defaultProps: {
        color: 'orange',
      },
    },
  },
};

const Coaches = () => {
  const [validationErrors, setValidationErrors] = useState({});

  // CREATE hook
  const { mutateAsync: createCoach, isLoading: isCreatingCoach } = useCreateCoach();
  // READ hook
  const {
    data: fetchedCoaches = [],
    isError: isLoadingCoachesError,
    isFetching: isFetchingCoaches,
    isLoading: isLoadingCoaches,
  } = useGetCoaches();
  // UPDATE hook
  const { mutateAsync: updateCoach, isLoading: isUpdatingCoach } = useUpdateCoach();
  // DELETE hook
  const { mutateAsync: deleteCoach, isLoading: isDeletingCoach } = useDeleteCoach();

  // CREATE action
  const handleCreateCoach = async ({ values, exitCreatingMode }) => {
    const newValidationErrors = validateCoach(values);
    if (Object.values(newValidationErrors).some((error) => !!error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createCoach(values);
    exitCreatingMode();
  };

  // UPDATE action
  const handleSaveCoach = async ({ values, table }) => {
    const newValidationErrors = validateCoach(values);
    if (Object.values(newValidationErrors).some((error) => !!error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateCoach(values);
    table.setEditingRow(null);
  };

  // DELETE action
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: 'Êtes-vous sûr de vouloir supprimer ce coach?',
      children: (
        <Text>
          Êtes-vous sûr de vouloir supprimer {row.original.nom} {row.original.prenom}? Cette action ne peut pas être annulée.
        </Text>
      ),
      labels: { confirm: 'Supprimer', cancel: 'Annuler' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteCoach(row.original.id),
    });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'nom',
        header: 'Nom',
        mantineEditTextInputProps: {
          required: true,
          error: validationErrors?.nom,
          onFocus: () => setValidationErrors({ ...validationErrors, nom: undefined }),
        },
      },
      {
        accessorKey: 'prenom',
        header: 'Prénom',
        mantineEditTextInputProps: {
          required: true,
          error: validationErrors?.prenom,
          onFocus: () => setValidationErrors({ ...validationErrors, prenom: undefined }),
        },
      },
      {
        accessorKey: 'tel',
        header: 'Téléphone',
        mantineEditTextInputProps: {
          type: 'tel',
          required: true,
          error: validationErrors?.tel,
          placeholder: '+212XXXXXXXXX',
          onFocus: () => setValidationErrors({ ...validationErrors, tel: undefined }),
        },
      },
      {
        accessorKey: 'adresse',
        header: 'Adresse',
        mantineEditTextInputProps: {
          error: validationErrors?.adresse,
          onFocus: () => setValidationErrors({ ...validationErrors, adresse: undefined }),
        },
      },
      {
        accessorKey: 'sexe',
        header: 'Sexe',
        editVariant: 'select',
        mantineEditSelectProps: {
          data: [
            { value: 'M', label: 'Masculin' },
            { value: 'F', label: 'Féminin' },
          ],
          error: validationErrors?.sexe,
          onFocus: () => setValidationErrors({ ...validationErrors, sexe: undefined }),
        },
      },
      {
        accessorKey: 'dateNaissance',
        header: 'Date de naissance',
        mantineEditTextInputProps: {
          type: 'date',
          error: validationErrors?.dateNaissance,
          onFocus: () => setValidationErrors({ ...validationErrors, dateNaissance: undefined }),
        },
      },
    ],
    [validationErrors],
  );

  const table = useMantineReactTable({
    columns,
    data: fetchedCoaches,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: isLoadingCoachesError
      ? {
          color: 'orange',
          children: 'Erreur lors du chargement des données',
        }
      : undefined,
    mantineTableContainerProps: {
      sx: {
        minHeight: '75vh',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateCoach,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveCoach,
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Modifier">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Supprimer">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        color="orange"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Ajouter un coach
      </Button>
    ),
    state: {
      isLoading: isLoadingCoaches,
      isSaving: isCreatingCoach || isUpdatingCoach || isDeletingCoach,
      showAlertBanner: isLoadingCoachesError,
      showProgressBars: isFetchingCoaches,
    },
  });

  return <MantineReactTable table={table} />;
};

// Validation functions
const validateRequired = (value) => !!value?.length;

const validatePhoneNumber = (phone) => {
  if (!phone) return false;
  // Format: +212 suivi de 9 chiffres
  const phoneRegex = /^\+212\d{9}$/;
  return phoneRegex.test(phone);
};

function validateCoach(coach) {
  const errors = {};
  if (!validateRequired(coach.nom)) {
    errors.nom = 'Le nom est requis';
  }
  if (!validateRequired(coach.prenom)) {
    errors.prenom = 'Le prénom est requis';
  }
  if (!validatePhoneNumber(coach.tel)) {
    errors.tel = 'Le numéro doit commencer par +212 suivi de 9 chiffres';
  }
  return errors;
}

// CREATE hook
function useCreateCoach() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (coach) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newCoachInfo) => {
      queryClient.setQueryData(['coaches'], (oldData = []) => {
        const newCoach = {
          ...newCoachInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        };
        return [...oldData, newCoach];
      });
    },
  });
}

// READ hook
function useGetCoaches() {
  return useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

// UPDATE hook
function useUpdateCoach() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedCoach) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (updatedCoach) => {
      queryClient.setQueryData(['coaches'], (oldData = []) => {
        return oldData.map((coach) =>
          coach.id === updatedCoach.id ? updatedCoach : coach
        );
      });
    },
  });
}

// DELETE hook
function useDeleteCoach() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (coachId) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (coachId) => {
      queryClient.setQueryData(['coaches'], (oldData = []) => {
        return oldData.filter((coach) => coach.id !== coachId);
      });
    },
  });
}

const queryClient = new QueryClient();

export default function CoachesPage() {
  return (
    <>
      <div className="container-fluid mb-4">
        <h1>La liste des coachs</h1>
    </div>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Coaches />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </>
);
}