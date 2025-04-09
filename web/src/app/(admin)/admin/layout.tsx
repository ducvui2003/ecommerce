const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="container grid-cols-12 gap-1">
        <aside className="col-span-2"></aside>
      </div>
      {children}
    </main>
  );
};

export default AdminLayout;
