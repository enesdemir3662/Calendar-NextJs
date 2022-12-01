import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "../config/axios";
import { TextField, Button, Modal, Stack, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModelExample({ eventModal, setEventModal, event, setEvents, events }) {
  const toggle = () => {
    setEventModal(false);
  };
  const deleteEvent = () => {
    toggle();
    const newEvents = events.filter((val) => {
      return event !== val;
    });
    setEvents(newEvents);
  };

  return (
    <div>
      <Modal
        open={eventModal || addModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <div>
            <h2 id="parent-modal-title">Etkinlik</h2>
            <br />
            <div
              className="center"
              style={{ justifyContent: "center", display: "flex" }}
            >
              <p>{event.title}</p>
            </div>
            <div
              className="center"
              style={{ justifyContent: "center", display: "flex" }}
            >
              <p>{event.start.toString()}</p>
            </div>
            <div
              className="center"
              style={{ justifyContent: "center", display: "flex" }}
            >
              <p>{event.end.toString()}</p>
            </div>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <Button color="secondary" onClick={toggle} variant="contained">
              Kapat
            </Button>
            <Button
              color="error"
              onClick={deleteEvent}
              variant="contained"
              sx={{ ml: 3 }}
            >
              Etkinliği Sil
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModelExample;
