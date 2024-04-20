import Header from "@/components/admin/header";
import { loginIsRequiredServer } from "@/lib/auth";

const AdminPage = async () => {
  await loginIsRequiredServer();

  return (
    <div >
      <Header />
    </div>
  );
};

export default AdminPage;
