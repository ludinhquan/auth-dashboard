import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetUsersResponse } from "@/api/@types";

export const UserTable = (props: Partial<GetUsersResponse>) => {
  const { data = [] } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Login Type</TableCell>
            <TableCell align="right">Login Count</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Last Session</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align="right">
                {user.isRegisteredWithGoogle ? "Google" : ""}
              </TableCell>
              <TableCell align="right">{user.loginCount}</TableCell>
              <TableCell align="right">{user.createdDate}</TableCell>
              <TableCell align="right">{user.lastSessionTimestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
