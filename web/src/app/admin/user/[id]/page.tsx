import { useRouter } from 'next/router';

type UserDetailAdminPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailAdminPage({
  params,
}: UserDetailAdminPageProps) {
  const { id } = await params;

  return <p>User: {id}</p>;
}
