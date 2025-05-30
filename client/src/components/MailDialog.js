import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import phoneIcon from "../images/phone.svg";
import mailIcon from "../images/mailIcon.svg";
import fileIcon from "../images/file.svg";

export default function MailDialog({ open, onClose, beaconEmail }) {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          minWidth: "600px",
          minHeight: "483px",
          borderRadius: "10px",
          overflow: "hidden",
          padding: "20px",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontFamily: "Open Sans, sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "24px",
          letterSpacing: "0.5px",
          color: "#902B43",
          borderRadius: "6px",
        }}
      >
        Contact Information
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#902B43",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontFamily: "Open Sans, sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "24px",
          letterSpacing: "0.5px",
          color: "black",
        }}
      >
        Departament de Genética
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "20px",
        }}
      >
        <Typography
          gutterBottom
          sx={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "0.5px",
            color: "black",
          }}
        >
          <div className="phonenumber-div">
            <img src={phoneIcon} alt="Phone Icon" className="phonenumber-img" />
            <span></span> {/* Hardcoded phone number */}
          </div>
          <div className="mail-div">
            <img src={mailIcon} alt="Mail Icon" className="mail-img" />
            <a
              href={`mailto:${beaconEmail.replace("mailto:", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mail-link"
            >
              {beaconEmail.replace("mailto:", "")}
              {/* {beaconEmail} */}
            </a>
          </div>
        </Typography>
      </DialogContent>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontFamily: "Open Sans, sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "24px",
          letterSpacing: "0.5px",
          color: "#902B43",
        }}
      >
        Handovers
      </DialogTitle>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontFamily: "Open Sans, sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "24px",
          letterSpacing: "0.5px",
          color: "black",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <img src={fileIcon} alt="File Icon" className="file-img" />
        LaMarató Beacon Network Standards
      </DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: "0",
        }}
      >
        <Typography
          gutterBottom
          sx={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "24px",
            letterSpacing: "0.5px",
            color: "#3176B1",
            wordBreak: "break-word",
            textDecoration: "underline",
            paddingBottom: "0",
          }}
        >
          <a
            href="https://docs.google.com/document/d/1b472gmuq5g_NZaYxJWnXGbwfGRgA1PfjhjSty3QqDv0/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="docs-link"
          >
            https://docs.google.com/document/d/1b472gmuq5g_NZaYxJWnXGbwfGRgA1PfjhjSty3QqDv0/edit?usp=sharing
          </a>
        </Typography>
      </DialogContent>
      <DialogContent>
        <Typography
          gutterBottom
          sx={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "0.5px",
            color: "black",
          }}
        >
          <span>
            In this section the different hospitals can add any extra
            information they want to share with the rest of the network.
          </span>
          <br />
          <span>
            Everything that may help the rest better understand how data was
            collected, processed and added to the Beacon may be helpful to the
            others.
          </span>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
