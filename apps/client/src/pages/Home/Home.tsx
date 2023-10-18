import { Box, Typography } from "@mui/material";
import { aspidaClient } from "@/libs/aspida";
import { useEffect, useState } from "react";
import { UserTable } from "./UserTable";
import { GetSummaryResponse, GetUsersResponse } from "@/api/@types";

export const HomePage = () => {
  const [summaryData, setSummaryData] = useState<GetSummaryResponse>();
  const [userData, setUserData] = useState<GetUsersResponse>();

  const getSummaryData = async () => {
    const result = await aspidaClient.dashboard.summary.get();
    setSummaryData(result.body);
  };

  const getUsers = async () => {
    const result = await aspidaClient.dashboard.users.get({});
    setUserData(result.body);
  };

  useEffect(() => {
    getSummaryData();
    getUsers();
  }, []);

  const summary = [
    { title: "Total users", value: summaryData?.totalUser },
    { title: "Total active users today", value: summaryData?.totalActiveUser },
    {
      title: "7-day average active user",
      value: summaryData?.averageActiveUser?.toFixed(1),
    },
  ];

  return (
    <Box>
      <Box sx={{ p: "20px 50px" }}>
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: 600,
            m: "20px 0",
            color: "#5f5f5f",
          }}
        >
          Summary
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {summary.map((item) => (
            <Box
              key={item.title}
              sx={{
                flex: 0.3,
                padding: "8px",
                height: "100px",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            >
              <Typography
                sx={{ fontSize: "20px", fontWeight: 400, color: "#5f5f5f" }}
              >
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: "40px", fontWeight: 500 }}>
                {item.value ?? "-"}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: 600,
            m: "20px 0",
            color: "#5f5f5f",
          }}
        >
          Users
        </Typography>
        <UserTable {...userData} />
      </Box>
    </Box>
  );
};
