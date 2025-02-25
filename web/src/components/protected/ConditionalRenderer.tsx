import { ReactNode } from 'react';

interface ConditionalRendererProps {
  condition: boolean;
  whenTrue: ReactNode;
  whenFalse: ReactNode;
}

export default function ConditionalRenderer({
  condition,
  whenTrue,
  whenFalse,
}: ConditionalRendererProps) {
  return <>{condition ? whenTrue : whenFalse}</>;
}
