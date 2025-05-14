import UserForm from '@/app/admin/user/[id]/user-form';

type UserDetailAdminPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailAdminPage({
  params,
}: UserDetailAdminPageProps) {
  const { id } = await params;

  if (!id) {
    return null;
  }
  return <UserForm id={parseInt(id)} />;
}
