import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TimeSlider from "./TimeSlider";
import TimeSelect from "./TimeSelect";
import TimeComponent from "./TimeComponent";
import { useState } from 'react';
import { useEffect } from 'react';

export default function TimeDialog({selectType, onTimeSelectHandler}) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [morning, setMorning] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onTimeSelectHandler(morning, hour, minute);
  };

  const selectedMorningTime = (isMorning) => {
    isMorning === "오전" ? setMorning(true) : setMorning(false);
  }
  const selectedHourTime = (hour) => {
    const time = parseInt(hour);
    setHour(time);
  }
  const selectedMinuteTime = (minute) => {
    const time = parseInt(minute);
    setMinute(time);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {selectType}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth="ls"
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {selectType}
        </DialogTitle>
        <DialogContent>
          <TimeComponent handleClose={handleClose} selectMorningHandler={selectedMorningTime} selectHourHandler={selectedHourTime} selectMinuteHandler={selectedMinuteTime}/>
          {/* <TimeSlider desc="시간을 선택해주세요" maxValue={23} selectHandler = {selectedHourTime}/>
          <TimeSlider desc="분을 선택해주세요" maxValue={59} selectHandler = {selectedMinuteTime}/> */}
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            선택하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}