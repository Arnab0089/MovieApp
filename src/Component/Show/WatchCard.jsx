/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { imagePath } from "../Services/api";
import { usefirestore } from "../Services/usefirestore";
import { useAuth } from "../../context/useAuth";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removeFromWatchlist } = usefirestore();
  const { user } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const handleRemoveClick = (event) => {
    event.preventDefault(); // Prevent the default behavior (link redirection)
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      <Box
        sx={{
          border: "5px solid",
          borderColor: "#d90429",
          background: "#2B2D42",
          borderRadius: "25px",
          height: "500px",
          py: 2,
          px: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box position={"relative"}>
              <Card>
                <CardMedia
                  component="img"
                  image={`${imagePath}/${item?.poster_path}`}
                  alt={item?.title || "Poster"}
                  sx={{
                    height: {
                      xs: "300px", // Smaller height for small screens
                      sm: "400px", // Standard height for larger screens
                    },
                    minWidth: "150px",
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: "20px",
                    sm: "35px",
                  },
                  textAlign: "center",
                }}
              >
                {item?.title || item?.name}
              </Typography>
              {!isSmallScreen && (
                <>
                  <Typography
                    fontSize={"sm"}
                    sx={{ textAlign: "center" }}
                    mt="2"
                  >
                    {new Date(
                      item?.release_date || item?.first_air_date
                    ).getFullYear() || "N/A"}
                  </Typography>
                  <Stack
                    alignItems={"center"}
                    gap={2}
                    mt="4"
                    sx={{ display: "flex", flexDirection: "row" }}
                    justifyContent={"center"}
                    width={"100%"}
                  >
                    <StarIcon
                      sx={{
                        fontSize: {
                          xs: "20px",
                          sm: "35px",
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "20px",
                          sm: "35px",
                        },
                      }}
                    >
                      {item?.vote_average?.toFixed(1)}
                    </Typography>
                  </Stack>
                  <Typography
                    mt={4}
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        md: "1rem",
                      },
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: isLgUp ? "none" : 4, // Only apply line clamping on smaller screens
                      maxHeight: isLgUp ? "none" : "6rem", // Adjust maxHeight to correspond with 4 lines of text
                    }}
                  >
                    {item?.overview}
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
};

export default WatchlistCard;
