import userManagerService from '@/service/manager/user.service';

type UserDetailAdminPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailAdminPage({
  params,
}: UserDetailAdminPageProps) {
  const { id } = await params;

  const data = await userManagerService.getDetail(parseInt(id));

  return <p>User: {data.name}</p>;
}
