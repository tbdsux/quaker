import Layout from './Layout';
import Menu from './Menu';

export const Loading = () => {
  return (
    <Layout title="Dashboard | QuaKer">
      <Menu />
      <hr />
      <div className="w-5/6 mx-auto">
        <p>Loading...</p>
      </div>
    </Layout>
  );
};
