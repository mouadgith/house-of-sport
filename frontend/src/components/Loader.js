import { Center, Loader } from '@mantine/core';

export default function PageLoader() {
  return (
    <Center style={{ minHeight: '100vh', width: '100%' }}>
      <Loader size="xl" color="orange" />
    </Center>
  );
} 