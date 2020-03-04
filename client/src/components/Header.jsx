import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Router, navigate} from '@reach/router';
import clsx from 'clsx';
import TeamDetail from '../views/TeamDetail';
import WinsGraph from './WinsGraph';
import RunsGraph from './RunsGraph';
import Welcome from '../views/Welcome';
import PayrollScatter from './PayrollScatter';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Drawer, CssBaseline, List, ListItem, ListItemText, Divider,  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BarChartIcon from '@material-ui/icons/BarChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import HomeIcon from '@material-ui/icons/Home';
import AllTeamDetail from '../views/AllTeamDetail';
import PlayerComparison from '../views/PlayerComparison';

export default () => {
    const [allTeams, setAllTeams] = useState([]);
    const [loaded, setLoaded] = useState(false);
    let leagueAvgId = "";

    useEffect(() => {
        axios.get('http://localhost:8000/api/team/')
        .then(response => {
            setAllTeams(response.data);
            setLoaded(true)
        });
    },[],)

    if(loaded){
      console.log(allTeams);
      for(let i = 0; i<allTeams.length; i++){
        if(allTeams[i].abbr === "AVG"){
          console.log(allTeams[i]);
          leagueAvgId = allTeams[i]._id;
        }
      }
    }
   
    const drawerWidth = 240;

    const useStyles = makeStyles(theme => ({
      root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        // backgroundImage: "linear-gradient(to right, #405D4A, #AAB7B8)"
        backgroundColor: "#405D4A"

      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,

      },
      drawerPaper: {
        width: drawerWidth,
        // backgroundImage: "linear-gradient(to right, #AAB7B8, #5F6A6A )"

      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    }));

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
   
    return(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Baseball DataViz
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </div>
                <Divider />
                <List>
                {['Home'].map((text, index) => (
                    <ListItem button key={index} onClick={(e) => {navigate('/')}} >
                    <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                {['Wins', 'Runs', 'Payroll', 'Player_Comparison'].map((text, index) => (
                    <ListItem button key={index} onClick={(e) => {navigate(`/graphs/${text}`)}} >
                    <ListItemIcon>{text==="Wins" || text ==="Runs" ? <BarChartIcon /> : text === "Payroll" ? <BubbleChartIcon/> : <MultilineChartIcon/>}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={(e) => {navigate(`/teams/`)}}>
                    <ListItemIcon><SportsBaseballIcon /></ListItemIcon>
                    
                    <ListItemText primary="All Teams" />
                    </ListItem>
                {loaded && allTeams.sort((a,b) => (a.city > b.city) ? 1 : -1).map((team, index) => (
                    <ListItem button key={index} onClick={(e) => {navigate(`/team/${team._id}`)}}>
                    <ListItemIcon><img style={{height:25, }} src={team.avatar} alt=""/></ListItemIcon>
                    
                        <ListItemText primary={team.city +" "+ team.nickname} />

                    </ListItem>
                ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Router>
                    <WinsGraph path="/graphs/Wins" allTeams={allTeams} setAllTeams={setAllTeams} loaded={loaded} setLoaded={setLoaded}/>
                    <RunsGraph path="/graphs/Runs" allTeams={allTeams} setAllTeams={setAllTeams} loaded={loaded} setLoaded={setLoaded}/>
                    <PayrollScatter path="/graphs/Payroll" />
                    <PlayerComparison path="/graphs/Player_Comparison" />
                    <TeamDetail path="/team/:id" allTeams={allTeams} setAllTeams={setAllTeams} loaded={loaded} setLoaded={setLoaded} leagueAvgId={leagueAvgId}/>
                    <AllTeamDetail path="/teams/" />
                    <Welcome path="/"/>
                </Router>
            </main>
        </div>
    )

    
}