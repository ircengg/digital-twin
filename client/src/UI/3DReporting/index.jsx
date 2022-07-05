import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';
import { List, ListItem, IconButton, Icon } from '@material-ui/core';

import React, { useEffect, useRef, useState, Suspense } from 'react'
import { Loader } from "@react-three/drei";

import { data, models, inspections } from '../data'
import Model from './Model'
// import Table from './Table';
// import Report from './Report';



const Home = () => {
  //const [models, setModels] = useState([]);
  const [activeModel, setActiveModel] = useState({});
  const [parts, setParts] = useState([]);

  const [rData, setRdata] = useState({});


  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  const classes = useStyles();
  const ref = useRef();


  // useEffect(() => {
  //   setModels(models)
  // }, [])


  // const loader = useSetRecoilState(waitLoaderState);
  // const [updates, setUpdates] = useState([]);



  const handelModelCLick = (e) => {
    let modelId = e.target.dataset.modelid;
    setActiveModel(models.find(m => m.id === modelId) || {});
  }

  return (
    <>
      {/* <Table /> */}
      <Suspense fallback={<Loader dataStyles={{ fontSize: '40px' }} />}>
        <div>
          <Grid container spacing={1}>
            <Grid item md={2} lg={2}>
              <List dense={true}>
                {
                  models.map((m) => (
                    <ListItem button onClick={handelModelCLick} data-modelid={m.id}>
                      <Icon>chevron_right</Icon>
                      {m.name}
                    </ListItem>
                  ))
                }
              </List>
            </Grid>
            <Grid item md={10} lg={10}>
              {activeModel.model && <Model model={activeModel} setParts={setParts} />}
            </Grid>
          </Grid>
        </div>
      </Suspense>
    </>
  );
}




export default Home