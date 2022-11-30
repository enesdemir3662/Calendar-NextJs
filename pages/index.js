import React, { useState } from "react";
import toast from "react-hot-toast";
import ModalExample from "../components/ModalExample";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack, TextField, Autocomplete, Button } from "@mui/material";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Home = () => {
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2022, 11, 0),
      end: new Date(2022, 11, 1),
    },
    {
      id: 1,
      title: "Long Event",
      start: new Date(2022, 11, 7),
      end: new Date(2022, 11, 10),
    },

    {
      id: 2,
      title: "DTS STARTS",
      start: new Date(2016, 2, 13, 0, 0, 0),
      end: new Date(2016, 2, 20, 0, 0, 0),
    },

    {
      id: 3,
      title: "DTS ENDS",
      start: new Date(2016, 10, 6, 0, 0, 0),
      end: new Date(2016, 10, 13, 0, 0, 0),
    },

    {
      id: 4,
      title: "Some Event",
      start: new Date(2022, 11, 9, 0, 0, 0),
      end: new Date(2022, 11, 10, 0, 0, 0),
    },
    {
      id: 5,
      title: "Conference",
      start: new Date(2022, 11, 11),
      end: new Date(2022, 11, 13),
      desc: "Big conference for important people",
    },
    {
      id: 6,
      title: "Meeting",
      start: new Date(2022, 11, 12, 10, 110, 0, 0),
      end: new Date(2022, 11, 12, 12, 110, 0, 0),
      desc: "Pre-meeting meeting, to prepare for the meeting",
    },
    {
      id: 7,
      title: "Lunch",
      start: new Date(2022, 11, 12, 12, 0, 0, 0),
      end: new Date(2022, 11, 12, 13, 0, 0, 0),
      desc: "Power lunch",
    },
    {
      id: 8,
      title: "Meeting",
      start: new Date(2022, 11, 12, 14, 0, 0, 0),
      end: new Date(2022, 11, 12, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: "Happy Hour",
      start: new Date(2022, 11, 12, 17, 0, 0, 0),
      end: new Date(2022, 11, 12, 17, 110, 0, 0),
      desc: "Most important meal of the day",
    },
    {
      id: 10,
      title: "Dinner",
      start: new Date(2022, 11, 12, 20, 0, 0, 0),
      end: new Date(2022, 11, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: "Birthday Party",
      start: new Date(2022, 11, 13, 7, 0, 0),
      end: new Date(2022, 11, 13, 10, 110, 0),
    },
    {
      id: 12,
      title: "Late Night Event",
      start: new Date(2022, 11, 17, 19, 110, 0),
      end: new Date(2022, 11, 18, 2, 0, 0),
    },
    {
      id: 12.5,
      title: "Late Same Night Event",
      start: new Date(2022, 11, 17, 19, 110, 0),
      end: new Date(2022, 11, 17, 23, 110, 0),
    },
    {
      id: 13,
      title: "Multi-day Event",
      start: new Date(2022, 11, 20, 19, 110, 0),
      end: new Date(2022, 11, 22, 2, 0, 0),
    },
    {
      id: 14,
      title: "Today",
      start: new Date(new Date().setHours(new Date().getHours() - 11)),
      end: new Date(new Date().setHours(new Date().getHours() + 11)),
    },
  ]);
  const [newEvents, setNewEvents] = useState([]);

  const [inputValue, setInputValue] = useState({
    title: "",
    start: new Date(new Date().setHours(new Date().getHours() - 11)),
    end: new Date(new Date().setHours(new Date().getHours() + 11)),
  });
  const [values, setValues] = useState(events);
  const [value, setValue] = React.useState(dayjs("2022-08-07T19:58:54.000Z"));
  const [eventModal, setEventModal] = useState(false);
  const [event, setEvent] = useState();

  const clickButton = () => {
    if (
      inputValue.title === "" ||
      inputValue.start === "" ||
      inputValue.end === ""
    ) {
      toast.error("Boşlukları doldurun!");
    } else if (inputValue.start >= inputValue.end) {
      toast.error("Seçmiş olduğunuz bitiş tarihi başlangıç tarihinden erken!");
    } else {
      setEvents([...events, inputValue]);
    }
  };

  const showModal = (event) => {
    setEvent(event);
    setEventModal(true);
  };

  return (
    <div className="Home">
      {eventModal && (
        <ModalExample
          event={event}
          eventModal={eventModal}
          setEventModal={setEventModal}
        />
      )}
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={3} sx={{ width: 500 }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={events}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            onChange={(event, newValue) => {
              setValues(newValue);
              // let newEvents_ = events.filter(({ title }) => {
              //   let control = "";
              //   newValue.map((v) => {
              //     if (v.title === title) {
              //       control = v.title;
              //     }
              //   });
              //   return title === control;
              // });
              setNewEvents(newValue);
            }}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  label="filterSelectedOptions"
                  placeholder="Favorites"
                />
              </>
            )}
          />
        </Stack>
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
          sx={{ mr: 5, ml: 5 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
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
          </Stack>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ ms: 5 }}>
          <Stack spacing={3}>
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
          </Stack>
        </LocalizationProvider>

        <Button
          style={{ marginTop: "10px" }}
          onClick={clickButton}
          variant="contained"
          sx={{ ml: 5 }}
        >
          Ekle
        </Button>
      </div>
      <Calendar
        localizer={localizer}
        events={newEvents.length > 0 ? newEvents : events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => showModal(event)}
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default Home;
