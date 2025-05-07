import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { ActionIcon, Button, Flex, Text, Tooltip, MantineProvider } from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Member from '../models/Member';
import 'bootstrap/dist/css/bootstrap.min.css';
// Sample data - replace with your actual data source
const fakeData = [
  {
    id: '1',
    nom: 'John',
    prenom: 'Doe',
    email: 'john@example.com',
    numTel: '+21234567890',
    adresse: '123 Main St',
    poids: '75',
    conditionMedicale: 'None',
    sexe: 'M',
    dateNaissance: '1990-01-01',
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

const Members = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [editedMembers, setEditedMembers] = useState({});

  // CREATE hook
  const { mutateAsync: createMember, isLoading: isCreatingMember } = useCreateMember();
  // READ hook
  const {
    data: fetchedMembers = [],
    isError: isLoadingMembersError,
    isFetching: isFetchingMembers,
    isLoading: isLoadingMembers,
  } = useGetMembers();
  // UPDATE hook
  const { mutateAsync: updateMembers, isLoading: isUpdatingMember } = useUpdateMembers();
  // DELETE hook
  const { mutateAsync: deleteMember, isLoading: isDeletingMember } = useDeleteMember();

  // CREATE action
  const handleCreateMember = async ({ values, exitCreatingMode }) => {
    const newValidationErrors = validateMember(values);
    if (Object.values(newValidationErrors).some((error) => !!error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createMember(values);
    exitCreatingMode();
  };

  // UPDATE action
  const handleSaveMembers = async () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;
    await updateMembers(Object.values(editedMembers));
    setEditedMembers({});
  };

  // DELETE action
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: 'Êtes-vous sûr de vouloir supprimer ce membre?',
      children: (
        <Text>
          Êtes-vous sûr de vouloir supprimer {row.original.nom} {row.original.prenom}? Cette action ne peut pas être annulée.
        </Text>
      ),
      labels: { confirm: 'Supprimer', cancel: 'Annuler' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteMember(row.original.id),
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
        mantineEditTextInputProps: ({ cell, row }) => ({
          required: true,
          error: validationErrors?.[cell.id],
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Requis'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedMembers({ ...editedMembers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'prenom',
        header: 'Prénom',
        mantineEditTextInputProps: ({ cell, row }) => ({
          required: true,
          error: validationErrors?.[cell.id],
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Requis'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedMembers({ ...editedMembers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        mantineEditTextInputProps: ({ cell, row }) => ({
          type: 'email',
          required: true,
          error: validationErrors?.[cell.id],
          onBlur: (event) => {
            const validationError = !validateEmail(event.currentTarget.value)
              ? 'Email invalide'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedMembers({ ...editedMembers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'numTel',
        header: 'Numéro de téléphone',
        mantineEditTextInputProps: ({ cell, row }) => ({
          type: 'tel',
          required: true,
          error: validationErrors?.[cell.id],
          placeholder: '+212XXXXXXXXX',
          onBlur: (event) => {
            const value = event.currentTarget.value;
            const validationError = !validatePhoneNumber(value)
              ? 'Le numéro doit commencer par +212 suivi de 9 chiffres'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            if (!validationError) {
              setEditedMembers({ ...editedMembers, [row.id]: row.original });
            }
          },
        }),
      },
      {
        accessorKey: 'adresse',
        header: 'Adresse',
        mantineEditTextInputProps: ({ cell, row }) => ({
          onBlur: (event) => {
            setEditedMembers({ ...editedMembers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'poids',
        header: 'Poids',
        mantineEditTextInputProps: ({ cell, row }) => ({
          type: 'number',
          onBlur: (event) => {
            setEditedMembers({ ...editedMembers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'conditionMedicale',
        header: 'Condition médicale',
        mantineEditTextInputProps: ({ cell, row }) => ({
          onBlur: (event) => {
            setEditedMembers({ ...editedMembers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'sexe',
        header: 'Sexe',
        editVariant: 'select',
        mantineEditSelectProps: ({ row }) => ({
          data: [
            { value: 'M', label: 'Masculin' },
            { value: 'F', label: 'Féminin' },
          ],
          onChange: (value) =>
            setEditedMembers({
              ...editedMembers,
              [row.id]: { ...row.original, sexe: value },
            }),
        }),
      },
      {
        accessorKey: 'dateNaissance',
        header: 'Date de naissance',
        mantineEditTextInputProps: ({ cell, row }) => ({
          type: 'date',
          onBlur: (event) => {
            setEditedMembers({ ...editedMembers, [row.id]: row.original });
          },
        }),
      },
    ],
    [editedMembers, validationErrors],
  );

  const table = useMantineReactTable({
    columns,
    data: fetchedMembers,
    createDisplayMode: 'row',
    editDisplayMode: 'cell',
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: isLoadingMembersError
      ? {
          color: 'orange',
          children: 'Erreur lors du chargement des données',
        }
      : undefined,
    mantineTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    mantineTableBodyRowProps: ({ row }) => ({
      sx: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#fff3e0',
        },
        '&:hover': {
          backgroundColor: '#ffe0b2',
        },
      },
    }),
    mantineEditTextInputProps: {
      sx: {
        '&:focus': {
          borderColor: '#f28705',
        },
      },
    },
    mantineSelectProps: {
      sx: {
        '&:focus': {
          borderColor: '#f28705',
        },
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateMember,
    renderRowActions: ({ row }) => (
      <Tooltip label="Supprimer">
        <ActionIcon color="orange" onClick={() => openDeleteConfirmModal(row)}>
          <IconTrash />
        </ActionIcon>
      </Tooltip>
    ),
    renderBottomToolbarCustomActions: () => (
      <Flex align="center" gap="md">
        <Button
          color="orange"
          onClick={handleSaveMembers}
          disabled={
            Object.keys(editedMembers).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
          loading={isUpdatingMember}
        >
          Enregistrer
        </Button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Text color="orange">Corrigez les erreurs avant de soumettre</Text>
        )}
      </Flex>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        color="orange"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Ajouter un membre
      </Button>
    ),
    state: {
      isLoading: isLoadingMembers,
      isSaving: isCreatingMember || isUpdatingMember || isDeletingMember,
      showAlertBanner: isLoadingMembersError,
      showProgressBars: isFetchingMembers,
    },
  });

  return <MantineReactTable table={table} />;
};

// Validation functions
const validateRequired = (value) => !!value?.length;

const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

const validatePhoneNumber = (phone) => {
  if (!phone) return false;
  // Format: +212 suivi de 9 chiffres
  const phoneRegex = /^\+212\d{9}$/;
  return phoneRegex.test(phone);
};

function validateMember(member) {
  const errors = {};
  
  if (!validateRequired(member.nom)) {
    errors.nom = 'Le nom est requis';
  }
  
  if (!validateRequired(member.prenom)) {
    errors.prenom = 'Le prénom est requis';
  }
  
  if (!validateEmail(member.email)) {
    errors.email = 'Format d\'email incorrect';
  }
  
  if (!validatePhoneNumber(member.numTel)) {
    errors.numTel = 'Le numéro doit commencer par +212 suivi de 9 chiffres';
  }
  
  return errors;
}

// CREATE hook
function useCreateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (member) => {
      // Implement your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newMemberInfo) => {
      queryClient.setQueryData(['members'], (oldData = []) => {
        const newMember = {
          ...newMemberInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        };
        return [...oldData, newMember];
      });
    },
  });
}

// READ hook
function useGetMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      // Implement your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

// UPDATE hook
function useUpdateMembers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (members) => {
      // Implement your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newMembers) => {
      queryClient.setQueryData(['members'], (oldData = []) => {
        return oldData.map((member) => {
          const newMember = newMembers.find((m) => m.id === member.id);
          return newMember || member;
        });
      });
    },
  });
}

// DELETE hook
function useDeleteMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (memberId) => {
      // Implement your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (memberId) => {
      queryClient.setQueryData(['members'], (oldData = []) => {
        return oldData.filter((member) => member.id !== memberId);
      });
    },
  });
}

const queryClient = new QueryClient();

const MembersPage = () => (
  <>
    <div className="container-fluid mb-4">
      <h1>La liste des membres</h1>
    </div>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Members />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </>
);

export default MembersPage;
