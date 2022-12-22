import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useCallback, useRef, useState } from "react";
import "../node_modules/video-react/dist/video-react.css";
import datasetVideo from "./assets/BW_2.mp4";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Player } from "video-react";

import Webcam from "react-webcam";

import MenuIcon from "@mui/icons-material/Menu";
import backWatching from "./assets/BW.png";
import backWatching1 from "./assets/BW_1.png";
import backWatching3 from "./assets/BW_3.png";
import frontWatching from "./assets/FW.png";
import mobileWatching1 from "./assets/MW_1.png";
import sideWatching from "./assets/S_W__1.png";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Paper from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import { Button, Grid } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [img, setImg] = useState(null);
  const [suspiciousScreenShots, setSuspiciousScreenShots] = useState([]);
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSuspiciousScreenShots((prev) => [...prev, imageSrc]);
    // setImg(imageSrc);
  }, [webcamRef]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const videoConstraints = {
    width: 1800,
    height: { max: 500 },
    aspectRatio: 0.6666666667,
    facingMode: "user",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Exam Invigilator
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: "100%",
              height: 500,
            },
          }}
        >
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Webcam
              ref={webcamRef}
              audio={false}
              mirrored={true}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            /> */}

            <img src={frontWatching} alt="img" />
          </Paper>
        </Box>

        <Box>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h5" mt={2} color="initial">
                Exam Hall No. - 4
              </Typography>
              <Typography variant="h6" mt={2} color="initial">
                Invigilator Name - XYZ
              </Typography>
              <Typography variant="h6" mt={2} color="initial">
                Total Number of Students - 50
              </Typography>
              <Typography variant="h6" mt={2} color="initial">
                Available Students - 35
              </Typography>
              <Typography variant="h6" mt={2} color="initial">
                Suspicious Activities Detected - 35
              </Typography>
            </Box>
            <Box mt={2}>
              <Button variant="contained" onClick={capture}>
                Take snap
              </Button>
              <Button variant="contained" style={{ marginLeft: "10px" }}>
                Generate Report
              </Button>
              <Button variant="contained" style={{ marginLeft: "10px" }}>
                Start
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                variant="contained"
                color="error"
              >
                Stop
              </Button>
            </Box>
          </Box>
        </Box>

        <Box mt={5}>
          <Typography variant="h5" color="initial">
            Suspicous Activities
          </Typography>
        </Box>

        <Grid mt={5} container gap={3}>
          {/* {suspiciousScreenShots.map((camera) => (
            <Grid item xs={3}>
              <Paper elevation={3}>
                <img src={camera} alt="camera" width="100%" />
              </Paper>
            </Grid>
          ))} */}

          <Grid item xs={3}>
            <Paper elevation={3}>
              <img src={backWatching} alt="camera" width="100%" />
              <Typography variant="5" color="initial">
                Back Watching
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
              <img src={backWatching1} alt="camera" width="100%" />
              <Typography variant="5" color="initial">
                Back Watching
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
              <img src={backWatching3} alt="camera" width="100%" />
              <Typography variant="5" color="initial">
                Back Watching
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
              <img src={frontWatching} alt="camera" width="100%" />
              <Typography variant="5" color="initial">
                Front Watching
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
              <img src={mobileWatching1} alt="camera" width="100%" />
              <Typography variant="5" color="initial">
                Mobile Watching
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
              <img src={sideWatching} alt="camera" width="100%" />
              <Typography variant="5" color="initial">
                Side Watching
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
              <img src={backWatching} alt="camera" width="100%" />
              <Typography variant="5" color="initial">
                Back Watching
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
