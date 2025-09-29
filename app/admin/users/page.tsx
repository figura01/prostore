import { getAllUsers, deleteUser } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/delete-dialog";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Admin Users",
};

const AdminUserPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  const { page = "1" } = await props.searchParams;
  const users = await getAllUsers({ page: Number(page) });

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Users</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {formatId(user.id as string)}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "user" ? (
                    <Badge variant="secondary">User</Badge>
                  ) : (
                    <Badge variant="default">Admin</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button asChild variant={"outline"} size={"sm"}>
                    <Link href={`/admin/users/${user.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={user.id} action={deleteUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={users.totalPages} />
        )}
      </div>
    </div>
  );
};

export default AdminUserPage;
