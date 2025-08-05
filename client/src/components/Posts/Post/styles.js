import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    position: 'relative',
    borderRadius: 15,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'cover',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  overlayEdit: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  details: {
    margin: '10px 16px 0 16px',
  },
  title: {
    margin: '0 16px',
    fontWeight: 'bold',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    justifyContent: 'space-between',
  },
}));
