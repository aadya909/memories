import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  // Desktop (default)
  mainContainer: {
    display: 'flex',
    flexDirection: 'row', // Form on the right, posts on the left
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  // Mobile override
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse', // Form below posts
    },
  },
}));
