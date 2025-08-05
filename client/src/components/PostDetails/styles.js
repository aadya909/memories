import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: "20px auto",
    maxWidth: 800,
  },
  media: {
    width: "100%",
    maxHeight: 400,
    objectFit: "cover",
    marginBottom: theme.spacing(2),
    borderRadius: "10px",
  },
  postDetailsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  commentSection: {
    marginTop: theme.spacing(2),
  },
  comment: {
    margin: "10px 0",
    padding: "8px",
    background: "#f9f9f9",
    borderRadius: "5px",
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    height: "39vh",
  },
}));
