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
import Member from '../models/Member';
import 'bootstrap/dist/css/bootstrap.min.css';
// Sample data - replace with your actual data source
const fakeData = [
  {
    id: '1',
    nom: 'John',
    prenom: 'Doe',
    email: 'john@example.com',
    telephone: '+212345678902',
    adresse: '123 Main St',
    poids: '75',
    condition_medicale: 'None',
    sexe: 'M',
    date_naissance: '1990-01-01',
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
  const { mutateAsync: updateMember, isLoading: isUpdatingMember } = useUpdateMembers();
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
  const handleSaveMember = async ({ values, table }) => {
    const newValidationErrors = validateMember(values);
    if (Object.values(newValidationErrors).some((error) => !!error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateMember(values);
    table.setEditingRow(null);
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
        accessorKey: 'email',
        header: 'Email',
        mantineEditTextInputProps: {
          type: 'email',
          required: true,
          error: validationErrors?.email,
          onFocus: () => setValidationErrors({ ...validationErrors, email: undefined }),
        },
      },
      {
        accessorKey: 'telephone',
        header: 'Numéro de téléphone',
        mantineEditTextInputProps: {
          type: 'tel',
          required: true,
          error: validationErrors?.telephone,
          placeholder: '+212XXXXXXXXX',
          onFocus: () => setValidationErrors({ ...validationErrors, telephone: undefined }),
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
        accessorKey: 'poids',
        header: 'Poids',
        mantineEditTextInputProps: {
          type: 'number',
          error: validationErrors?.poids,
          onFocus: () => setValidationErrors({ ...validationErrors, poids: undefined }),
        },
      },
      {
        accessorKey: 'condition_medicale',
        header: 'Condition médicale',
        mantineEditTextInputProps: {
          error: validationErrors?.condition_medicale,
          onFocus: () => setValidationErrors({ ...validationErrors, condition_medicale: undefined }),
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
        accessorKey: 'date_naissance',
        header: 'Date de naissance',
        mantineEditTextInputProps: {
          type: 'date',
          error: validationErrors?.date_naissance,
          onFocus: () => setValidationErrors({ ...validationErrors, date_naissance: undefined }),
        },
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          if (isNaN(date)) {
            return cell.getValue();
          }
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        },
      },
    ],
    [validationErrors],
  );

  const table = useMantineReactTable({
    columns,
    data: fetchedMembers,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: isLoadingMembersError
      ? {
          color: 'orange',
          children: 'Erreur lors du chargement des données',
        }
      : undefined,
    mantineTableContainerProps: {
      sx: {
        maxHeight: '80vh',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateMember,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveMember,
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
  
  if (!validatePhoneNumber(member.telephone)) {
    errors.telephone = 'Le numéro doit commencer par +212 suivi de 9 chiffres';
  }
  
  return errors;
}

// CREATE hook
function useCreateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (member) => {
      // Implement your API call here
      const response = await fetch('http://localhost:8000/api/adherents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(member),
      });
      if (!response.ok) {
        throw new Error('Failed to create member');
      }
      return response.json(); // Assuming the API returns the newly created member data
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}

// READ hook
function useGetMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/adherents'); // Use the provided API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await response.json();
      // Assuming the API returns an array of member objects that match the column structure
      return data;
    },
  });
}

// UPDATE hook
function useUpdateMembers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedMember) => {
      // Implement your API call here
      // Transform the member data to match backend expectations
      const memberDataForBackend = {
        ...updatedMember,
        telephone: updatedMember.telephone,
      };
      // Remove the original telephone field if necessary (optional, but cleaner)
      delete memberDataForBackend.telephone;

       const response = await fetch(`http://localhost:8000/api/adherents/${updatedMember.id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(memberDataForBackend), // Send the transformed data
       });
       if (!response.ok) {
         throw new Error('Failed to update member');
       }
       return response.json(); // Assuming the API returns the updated member data
    },
    onMutate: (updatedMember) => {
      queryClient.setQueryData(['members'], (oldData = []) => {
        return oldData.map((member) =>
          member.id === updatedMember.id ? updatedMember : member
        );
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}

// DELETE hook
function useDeleteMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (memberId) => {
      // Implement your API call here
      const response = await fetch(`http://localhost:8000/api/adherents/${memberId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete member');
      }
      return true; // Indicate success
    },
    onMutate: (memberId) => {
      queryClient.setQueryData(['members'], (oldData = []) => {
        return oldData.filter((member) => member.id !== memberId);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
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
