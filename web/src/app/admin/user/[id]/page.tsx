import UserDetail from '@/app/admin/user/[id]/user-detail';

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
  return <UserDetail id={parseInt(id)} />;
}
