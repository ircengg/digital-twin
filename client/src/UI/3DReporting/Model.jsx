
import React, { useEffect, useRef, useState, Suspense } from "react";
import { useGLTF, OrbitControls, Stage, Loader, Html, Text } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, IconButton, Icon } from '@material-ui/core';
import { useParams } from "react-router-dom";




const Component = ({ comp, wireframe }) => {
    const [hovered, setHovered] = useState(false)



    return (<mesh
        geometry={comp.geometry}
        name={comp.name}
        onPointerOver={() => { setHovered(true) }}
        onPointerOut={() => { setHovered(false) }}
    >
        <meshStandardMaterial
            wireframe={wireframe}
            metalness={1}
            roughness={0.2}
            wireframeLinejoin={true}
            color={hovered ? 'yellow' : '#D7CCC8'}
            transparent
            opacity={0.7}
            colorWrite={true}
        />
    </mesh>)
}


const Equipment = ({ equip, wireframe }) => {

    const group = useRef();

    return (
        <group ref={group} dispose={null}>
            {
                equip.children && equip.children.map(comp => (
                    <Component key={comp.uuid} comp={comp} wireframe={wireframe} />
                ))
            }
        </group>
    )
}










export default function Model({ model, setParts }) {
    const [labelVisibility, setlabelVisibility] = useState(true);
    const [wireframe, setWireframe] = useState(false);


    const loadedModel = useGLTF(model.model);


    console.log(loadedModel)
    const { scene, nodes } = loadedModel;



    useEffect(() => {
        // let p = Object.entries(nodes).map(([id, nod]) => id);
        // console.log(p)
        // setParts(p);
    }, [model])

    useGLTF.preload(model.model);

    const ref = useRef();
    const group = useRef();


    const toggleLabelVisibility = () => {
        setlabelVisibility(!labelVisibility);
    }
    const toggleWireframe = (e) => {
        setWireframe(!wireframe)
    }


    return (
        <Paper elevation={3} variant="outlined">
            <div>
                <button onClick={toggleLabelVisibility}><img src="https://img.icons8.com/nolan/64/wireframe-display-modes.png" /></button>
                <button onClick={toggleWireframe}><img src="https://img.icons8.com/nolan/64/edged-faces-display-modes.png" /></button>
            </div>
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }} style={{ height: '650px' }} >
                <Stage controls={ref} adjustCamera shadows={false} preset="rembrandt" intensity={0} environment="dawn" >
                    <group>
                        {
                            Object.entries(nodes).map(([id, node]) => node.type==='Mesh' && <Component comp={node} wireframe={wireframe} />)
                        }
                    </group>
                    <axesHelper args={[4]} />
                </Stage>
                <color attach="background" args={["grey"]} />
                <OrbitControls
                    ref={ref}
                    autoRotate={false}
                />
            </Canvas>
        </Paper>
    );
}

