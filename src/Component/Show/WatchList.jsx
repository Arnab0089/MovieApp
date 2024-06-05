import { Box, Card, Grid, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usefirestore } from "../Services/usefirestore";
import { useAuth } from "../../context/useAuth";
import WatchCard from "./WatchCard";
import { Link } from "react-router-dom";
import Card_Component from "../Card_Compo/Card_Component";
import { useMediaQuery } from "@mui/material";

export default function WatchList() {
  const { getWatchList } = usefirestore();
  const { user } = useAuth();
  const [watchList, setwatchList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    if (user && user.uid) {
      // Ensure user and user.uid exist
      getWatchList(user.uid)
        .then((data) => {
          setwatchList(data);
          console.log(data);
        })
        .catch((Error) => {
          console.log(Error);
        })
        .finally(() => {
          setisLoading(false); // Correctly use the state setter
        });
    }
  }, [user, getWatchList]);

  return (
    <div>
      <Box sx={{ pt: 10, px: 5 }}>
        <Stack alignItems="baseline" spacing={4}>
          <Typography variant="h5">WatchList</Typography>
        </Stack>
        {/* {isLoading && (
          <Grid xs={12} sm={4} md={2} m={2}>
            <Card>
              <Skeleton
                height={isSmallScreen ? "250px" : "400px"} // Adjusted height for small screens
                width={isSmallScreen ? "auto" : "100%"} // Adjusted width for small screens
              ></Skeleton>
            </Card>
          </Grid>
        )} */}
        {!isLoading && watchList.length === 0 && (
          <Stack alignItems="baseline" justifyItems={center} spacing={4}>
            <Typography variant="h5">No Data Is Found</Typography>
          </Stack>
        )}
        {!isLoading && watchList.length > 0 && (
          <>
            <Grid container spacing={2}>
              {watchList.map((item) => (
                <Grid key={item?.id} item xs={12} sm={6}>
                  <WatchCard
                    item={item}
                    type={item?.type}
                    setWatchlist={setwatchList}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </div>
  );
}
