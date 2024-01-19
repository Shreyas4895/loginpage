import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAuth } from "firebase/auth";
import { Trans, useTranslation } from "react-i18next";

export default function UserTable() {
  const { t } = useTranslation();

  const auth = getAuth();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="caption table">
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>
            <Trans i18nKey="description.name">{t("description.name")}</Trans>
          </TableCell>
          <TableCell align="center">{auth?.currentUser?.displayName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>
            <Trans i18nKey="description.email">{t("description.email")}</Trans>
          </TableCell>
          <TableCell align="center">{auth?.currentUser?.email}</TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
}
