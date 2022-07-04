
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, Html, MeshDistortMaterial } from "@react-three/drei";

// //const model = new URL('https://firebasestorage.googleapis.com/v0/b/ircengg-711a1.appspot.com/o/models%2Fmsline.glb?alt=media&token=4278e886-f023-465a-bdb5-6d0165c2ccc2', import.meta.url);
//  const model = new URL('../../public/msline.glb', import.meta.url);
// //  const model = 'https://drive.google.com/uc?export=download&id=1Xg6aBKIFikf26t20n-Y0UUPkTmMw3T6n';
// //  const model = 'https://firebasestorage.googleapis.com/v0/b/ircengg-711a1.appspot.com/o/models%2Fmsline.glb?alt=media&token=4278e886-f023-465a-bdb5-6d0165c2ccc2';
// console.log(model)



export default function Model({ model = {}, setRdata }) {
    console.log('rendered')
    const loadedModel = useGLTF(model.model);
    const { nodes, materials } = loadedModel;
    console.log(loadedModel)

    const [parts, setParts] = useState([]);
    const [color, setColor] = useState('silver');
    const group = useRef();
    const handleHoverOn = (e) => {
        document.body.style.cursor = 'pointer'
        setColor('yellow')

    }
    const handleHoverOut = (e) => {
        document.body.style.cursor = 'auto'
        setColor('silver')
    }

    const handleClick = (e) => {
        let userData = e.eventObject.userData;
        setRdata(userData)
    }

    useEffect(() => {
        setParts(Object.entries(nodes).map(([id, nod]) => id));
    }, [])

    useGLTF.preload(model.model);


    return (
        <group ref={group} dispose={null} >
            {
                Object.entries(nodes).map(([id, nod]) => {
                    console.log(model);
                    let { components = {} } = model;
                    let component = components[id] ? components[id] : {};
                    let { criticality } = component;
                    let color = criticality && criticality > 0.66 ? 'red' : criticality > 0.33 ? 'yellow' : 'green';

                    return (nod.geometry && <group ref={group}>
                        <mesh
                            key={id}
                            geometry={nod.geometry}
                            name={id}
                            // onPointerOver={handleHoverOn}
                            // onPointerOut={handleHoverOut}
                            onClick={handleClick}
                            userData={model.components[id]}
                        >
                            <MeshDistortMaterial distort={0.05} metalness={1.0}  roughness={0.3} speed={10} color={color} />
                            <Html >
                                <div className="label">{id}</div>
                            </Html>
                        </mesh>
                    </group>
                    )
                })
            }
        </group>
    );

}

