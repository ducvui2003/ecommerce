import ListViewMedia from '@/components/media/ListViewMedia';
import MediaDialog from '@/components/media/MediaDialog';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      My Post: {slug}
      <div>
        <MediaDialog />
      </div>
    </div>
  );
}
