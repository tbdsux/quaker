import DashMenu from '@components/dashboard/DashMenu';
import Layout from '../Layout';

export const UserLoading = () => {
  return (
    <Layout title="Dashboard | QuaKer">
      <DashMenu />
      <hr />
      <div className="w-5/6 mx-auto">
        <p>Loading...</p>
      </div>
    </Layout>
  );
};
