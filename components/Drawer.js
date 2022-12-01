import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { TextField, Button, Modal, Stack, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Drawer_ = ({ events, setEvents }) => {
  const anchor = "right";
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [inputValue, setInputValue] = useState({
    title: "",
    start: new Date(new Date().setHours(new Date().getHours() - 11)),
    end: new Date(new Date().setHours(new Date().getHours() + 11)),
  });

  const [allDay, setAllDay] = useState(false);

  const saveEvent = () => {
    if (
      inputValue.title === "" ||
      inputValue.start === "" ||
      inputValue.end === ""
    ) {
      toast.error("Boşlukları doldurun!");
    } else if (inputValue.start >= inputValue.end) {
      toast.error("Seçmiş olduğunuz bitiş tarihi başlangıç tarihinden erken!");
    } else {
      toast.success("Başarılı!");
      setEvents([...events, inputValue]);
      setState({ ...state, [anchor]: false });
      setInputValue((prev) => ({
        ...prev,
        title: "",
      }));
    }
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 400,
        padding: 5,
      }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding sx={{ mt: 3 }}>
          <TextField
            label="Etkinlik ekle"
            id="outlined-size-small"
            size="small"
            type="text"
            value={inputValue.event}
            onChange={(e) =>
              setInputValue((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            sx={{ width: "100%" }}
          />
        </ListItem>
        <ListItem disablePadding sx={{ mt: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              {allDay === false ? (
                <DateTimePicker
                  label="Başlangıç Tarihi"
                  inputFormat="DD/MM/YYYY - HH:mm"
                  value={inputValue.start}
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      start: e.$d,
                    }))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : (
                <DesktopDatePicker
                  label="Başlangıç Tarihi"
                  inputFormat="DD/MM/YYYY"
                  value={inputValue.start}
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      start: e.$d,
                    }))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </Stack>
          </LocalizationProvider>
        </ListItem>
        <ListItem disablePadding sx={{ mt: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              {allDay === false ? (
                <DateTimePicker
                  label="Bitiş Tarihi"
                  inputFormat="DD/MM/YYYY - HH:mm"
                  value={inputValue.end}
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      end: e.$d,
                    }))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : (
                <DesktopDatePicker
                  label="Bitiş Tarihi"
                  inputFormat="DD/MM/YYYY"
                  value={inputValue.end}
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      end: e.$d,
                    }))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </Stack>
          </LocalizationProvider>
        </ListItem>
        <ListItem disablePadding>
          <div style={{ marginLeft: "1em" }}>
            <Switch {...label} onChange={(e) => setAllDay(e.target.checked)} />
            <p>Tam Gün</p>
          </div>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ mt: 3 }}>
          <div style={{ display: "flex" }}>
            <Button
              color="error"
              onClick={() => setState({ ...state, [anchor]: false })}
              variant="contained"
            >
              Kapat
            </Button>
            <Button
              color="success"
              sx={{ ml: 2 }}
              onClick={saveEvent}
              variant="contained"
            >
              Kaydet
            </Button>
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Button
          sx={{ ml: 5 }}
          color="secondary"
          onClick={toggleDrawer(anchor, true)}
          variant="contained"
        >
          Etkinlik Ekle
        </Button>

        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
export default Drawer_;
