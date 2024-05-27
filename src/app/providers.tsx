import { AuthProvider } from '@/providers/auth-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;
