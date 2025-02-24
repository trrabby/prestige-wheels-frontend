import { GradientCircularProgress } from "@/components/Progress";
import { useGetAllUsersQuery } from "@/redux/features/admin/userManagement/UsersManagementApi";
import ManageUsersTable from "./ManageUsersTable";
import { SectionHead } from "@/components/SectionHead";

const Users = () => {
  const { data: UsersData, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <GradientCircularProgress />
      </div>
    );
  console.log(UsersData);

  return (
    <div>
      <SectionHead title="All Users" />
      <ManageUsersTable usersData={UsersData?.data || []} />
    </div>
  );
};

export default Users;
