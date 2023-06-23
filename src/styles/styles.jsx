import { makeStyles } from '@mui/styles';

const styles = (theme) => {
  return {
    formContainer: {
      flexGrow: 1,
      padding: '10px',
      maxWidth: '700px',
      margin: '30px auto',
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '100%',
      },
    },
    form: {
      marginTop: '20px',
    },
    formHeading: {
      textAlign: 'center',
    },
    heroBox: {
      width: '100%',
      display: 'flex',
      minHeight: '600px',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '-60px',
    },
    gridContainer: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: '1300px',
      padding: '50px',
    },
    aboutUsContainer: {
      width: '100%',
      display: 'flex',
      minHeight: '400px',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px 0px 40px 0px',
    },
    aboutUsSubtitle: {
      opacity: '0.7',
      paddingBottom: '30px',
      fontSize: '18px',
    },
    title: {
      paddingBottom: '15px',
    },
    subtitle: {
      opacity: '0.4',
      paddingBottom: '30px',
    },
    largeImage: {
      width: '100%',
    },
    sectionGridContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: '500px',
    },
    sectionGridItem: {
      backgroundColor: '#f2f0f1',
      textAlign: 'center',
      padding: '30px',
      width: '200px',
      borderRadius: '10px',
      margin: '10px !important',
    },

    footerContainer: {
      display: 'flex',
      alignItems: 'center',
      miHeight: '10vh',
      padding: '20px',
      justifyContent: 'center',
      backgroundColor: '#24406c',
      flexDirection: 'column',
    },
    footerText: {
      paddingBottom: '10px',
      color: 'white',
    },
    footerDate: {
      opacity: '0.4',
      color: 'white',
    },
    testimonialCard: {
      backgroundColor: '#fff',
      padding: '10px',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
    },
    testimonialStatement: {
      paddingBottom: '25px',
    },
    avatar: {
      marginRight: '10px',
    },
    testimonialPosition: {
      fontSize: '14px',
      opacity: '0.6',
    },
  };
};

const useStyles = makeStyles(styles);
export default useStyles;
