import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import mountainIslandScene from "../assets/3d/island_mountain.glb";

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(mountainIslandScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      lastX.current = clientX;

      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case (normalizedRotation >= 0 && normalizedRotation <= 0.3) ||
          (normalizedRotation >= 5.9 && normalizedRotation <= 6.3):
          setCurrentStage(4);
          break;
        case normalizedRotation >= 1.2 && normalizedRotation <= 1.8:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 3.8 && normalizedRotation <= 4.1:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <a.group ref={islandRef} {...props}>
      <mesh
        name="Island"
        geometry={nodes.Island.geometry}
        material={materials["Material_0.002"]}
        position={[0, 201.289, 0]}
        scale={2000}
      />
      <mesh
        name="Mountain"
        geometry={nodes.Mountain.geometry}
        material={materials["Material_0.003"]}
        position={[-3.089, 409.859, -73.364]}
        scale={1124.899}
      />
      <mesh
        name="SkiLodge"
        geometry={nodes.SkiLodge.geometry}
        material={materials.defaultMat}
        position={[678.63, 160.875, 40.731]}
        rotation={[0.042, -0.112, -0.338]}
        scale={214.201}
      />
      <mesh
        name="GondolaTower1"
        geometry={nodes.GondolaTower1.geometry}
        material={materials["Material_0.004"]}
        position={[296.423, 436.546, -14.346]}
        rotation={[-3.129, 0.445, 3.074]}
        scale={[86.088, 65.189, 86.155]}
      />
      <mesh
        name="GondolaTower2"
        geometry={nodes.GondolaTower2.geometry}
        material={materials["Material_0.005"]}
        position={[329.574, 341.595, -178.218]}
        rotation={[-Math.PI, 0.192, -Math.PI]}
        scale={87.644}
      />
      <mesh
        name="GondolaBaseTower"
        geometry={nodes.GondolaBaseTower.geometry}
        material={materials["defaultMat.002"]}
        position={[410.447, 156.193, -479.774]}
        scale={[-81.99, -47.435, -81.99]}
      />
      <mesh
        name="GondolaBase"
        geometry={nodes.GondolaBase.geometry}
        material={materials["defaultMat.003"]}
        position={[409.647, 186.647, -478.726]}
        rotation={[-0.162, -0.343, 0]}
        scale={71.856}
      />
      <mesh
        name="GondolaWire2"
        geometry={nodes.GondolaWire2.geometry}
        material={materials["Material_0.006"]}
        position={[351.69, 276.687, -316.462]}
        rotation={[-0.625, -0.213, 2.647]}
        scale={[20.522, 21.695, 282.182]}
      />
      <mesh
        name="GondolaWire1"
        geometry={nodes.GondolaWire1.geometry}
        material={materials["Material_0.006"]}
        position={[376.737, 277.543, -309.5]}
        rotation={[-0.625, -0.213, 2.647]}
        scale={[20.522, 21.695, 282.182]}
      />
      <mesh
        name="GondolaWire3"
        geometry={nodes.GondolaWire3.geometry}
        material={materials["Material_0.008"]}
        position={[298.481, 416.671, -100.023]}
        rotation={[-0.481, -0.213, 2.647]}
        scale={[18.102, 18.851, 155.705]}
      />
      <mesh
        name="GondolaWire4"
        geometry={nodes.GondolaWire4.geometry}
        material={materials["Material_0.009"]}
        position={[321.978, 413.073, -93.244]}
        rotation={[-0.481, -0.213, 2.647]}
        scale={[18.322, 19.008, 165.093]}
      />
      <mesh
        name="GondolaTopTower"
        geometry={nodes.GondolaTopTower.geometry}
        material={materials["defaultMat.004"]}
        position={[239.675, 536.373, 191.953]}
        scale={[-57.435, -33.229, -57.435]}
      />
      <mesh
        name="GondolaTop"
        geometry={nodes.GondolaTop.geometry}
        material={materials["defaultMat.005"]}
        position={[239.115, 557.707, 192.687]}
        rotation={[-0.162, -0.343, 0]}
        scale={50.336}
      />
      <mesh
        name="GondolaWire5"
        geometry={nodes.GondolaWire5.geometry}
        material={materials["Material_0.010"]}
        position={[283.608, 503.948, 75.682]}
        rotation={[-0.481, -0.213, 2.647]}
        scale={[18.775, 19.33, 185.728]}
      />
      <mesh
        name="GondolaWire6"
        geometry={nodes.GondolaWire6.geometry}
        material={materials["Material_0.011"]}
        position={[272.638, 506.721, 66.622]}
        rotation={[-0.481, -0.213, 2.647]}
        scale={[18.992, 19.483, 196.403]}
      />
      <mesh
        name="PineTree0"
        geometry={nodes.PineTree0.geometry}
        material={materials["Material_0.012"]}
        position={[-988.972, 98.692, 5.54]}
        rotation={[-2.94, 1.252, 2.995]}
        scale={78.705}
      />
      <mesh
        name="PineTree1"
        geometry={nodes.PineTree1.geometry}
        material={materials["Material_0.013"]}
        position={[-808.643, 165.78, 478.798]}
        rotation={[0.1, 0, 0]}
        scale={78.705}
      />
      <mesh
        name="PineTree2"
        geometry={nodes.PineTree2.geometry}
        material={materials["Material_0.014"]}
        position={[-992.278, 83.52, -34.241]}
        rotation={[0.071, -0.939, 0]}
        scale={61.651}
      />
      <mesh
        name="PineTree3"
        geometry={nodes.PineTree3.geometry}
        material={materials["Material_0.015"]}
        position={[-1028.932, 68.62, -3.225]}
        rotation={[0.071, -0.939, 0]}
        scale={49.224}
      />
      <mesh
        name="PineTree4"
        geometry={nodes.PineTree4.geometry}
        material={materials["Material_0.016"]}
        position={[-728.854, 181.793, 476.674]}
        scale={48.858}
      />
      <mesh
        name="PineTree5"
        geometry={nodes.PineTree5.geometry}
        material={materials["Material_0.017"]}
        position={[-745.96, 200.987, 427.995]}
        rotation={[Math.PI, -1.173, Math.PI]}
        scale={85.228}
      />
      <mesh
        name="SnowyPineTree0"
        geometry={nodes.SnowyPineTree0.geometry}
        material={materials["defaultMat.006"]}
        position={[376.425, 332.668, -170.487]}
        rotation={[Math.PI, -0.451, Math.PI]}
        scale={75.165}
      />
      <mesh
        name="SnowyPineTree1"
        geometry={nodes.SnowyPineTree1.geometry}
        material={materials["defaultMat.007"]}
        position={[447.4, 306.159, 142.651]}
        rotation={[-Math.PI, 0.983, -Math.PI]}
        scale={75.165}
      />
      <mesh
        name="SnowyPineTree2"
        geometry={nodes.SnowyPineTree2.geometry}
        material={materials["defaultMat.008"]}
        position={[484.801, 284.469, 133.41]}
        rotation={[0, -1.357, 0]}
        scale={70.119}
      />
      <mesh
        name="SnowyPineTree3"
        geometry={nodes.SnowyPineTree3.geometry}
        material={materials["defaultMat.009"]}
        position={[515.788, 262.344, 116.513]}
        rotation={[Math.PI, -0.461, Math.PI]}
        scale={52.047}
      />
      <mesh
        name="SnowyPineTree4"
        geometry={nodes.SnowyPineTree4.geometry}
        material={materials["defaultMat.010"]}
        position={[483.244, 140.741, -519.25]}
        rotation={[-Math.PI, 0.983, -Math.PI]}
        scale={53.646}
      />
      <mesh
        name="SnowyPineTree5"
        geometry={nodes.SnowyPineTree5.geometry}
        material={materials["defaultMat.011"]}
        position={[465.286, 139.444, -534]}
        rotation={[0, -1.473, 0]}
        scale={53.646}
      />
      <mesh
        name="SnowyPineTree6"
        geometry={nodes.SnowyPineTree6.geometry}
        material={materials["defaultMat.012"]}
        position={[488.984, 122.713, -538.814]}
        rotation={[Math.PI, -0.062, Math.PI]}
        scale={36.198}
      />
      <mesh
        name="SnowyPineTree7"
        geometry={nodes.SnowyPineTree7.geometry}
        material={materials["defaultMat.013"]}
        position={[445.585, 128.879, -569.402]}
        rotation={[Math.PI, -0.062, Math.PI]}
        scale={49.44}
      />
      <mesh
        name="SnowyPineTree8"
        geometry={nodes.SnowyPineTree8.geometry}
        material={materials["defaultMat.014"]}
        position={[640.167, 181.288, 230.387]}
        rotation={[-Math.PI, 0.983, -Math.PI]}
        scale={114.586}
      />
      <mesh
        name="SnowyPineTree9"
        geometry={nodes.SnowyPineTree9.geometry}
        material={materials["defaultMat.015"]}
        position={[686.427, 167.491, 227.714]}
        rotation={[-Math.PI, 0.983, -Math.PI]}
        scale={114.586}
      />
      <mesh
        name="SnowyPineTree10"
        geometry={nodes.SnowyPineTree10.geometry}
        material={materials["defaultMat.016"]}
        position={[733.602, 152.52, 179.703]}
        rotation={[0, -1.203, 0]}
        scale={102.111}
      />
      <mesh
        name="SnowyPineTree11"
        geometry={nodes.SnowyPineTree11.geometry}
        material={materials["defaultMat.017"]}
        position={[620.252, 204.724, -127.82]}
        rotation={[-Math.PI, 0.098, -Math.PI]}
        scale={[121.293, 121.292, 121.293]}
      />
      <mesh
        name="SnowyPineTree12"
        geometry={nodes.SnowyPineTree12.geometry}
        material={materials["defaultMat.018"]}
        position={[759.67, 139.031, -68.214]}
        rotation={[0, 0.14, 0]}
        scale={73.378}
      />
      <mesh
        name="SnowyPineTree13"
        geometry={nodes.SnowyPineTree13.geometry}
        material={materials["defaultMat.019"]}
        position={[255.546, 503.954, 217.348]}
        rotation={[Math.PI, -0.461, Math.PI]}
        scale={52.047}
      />
      <mesh
        name="SnowyPineTree14"
        geometry={nodes.SnowyPineTree14.geometry}
        material={materials["defaultMat.020"]}
        position={[332.571, 324.685, -166.684]}
        rotation={[Math.PI, -0.451, Math.PI]}
        scale={51.231}
      />
      <mesh
        name="SnowyPineTree15"
        geometry={nodes.SnowyPineTree15.geometry}
        material={materials["defaultMat.021"]}
        position={[542.462, 114.135, -560.69]}
        rotation={[0, -1.473, 0]}
        scale={53.646}
      />
      <mesh
        name="SnowyPineTree16"
        geometry={nodes.SnowyPineTree16.geometry}
        material={materials["defaultMat.022"]}
        position={[505.331, 108.444, -596.491]}
        rotation={[0, -1.473, 0]}
        scale={53.646}
      />
      <mesh
        name="SnowyPineTree17"
        geometry={nodes.SnowyPineTree17.geometry}
        material={materials["defaultMat.023"]}
        position={[543.78, 99.619, -599.438]}
        rotation={[0, -1.473, 0]}
        scale={53.646}
      />
      <mesh
        name="Gondola0"
        geometry={nodes.Gondola0.geometry}
        material={materials["defaultMat.024"]}
        position={[321.717, 330.481, -213.356]}
        rotation={[-0.582, -0.179, -0.375]}
        scale={35.648}
      />
      <mesh
        name="Gondola1"
        geometry={nodes.Gondola1.geometry}
        material={materials["defaultMat.028"]}
        position={[432.466, 162.232, -478.954]}
        rotation={[-0.077, -0.502, -0.075]}
        scale={35.648}
      />
      <mesh
        name="Gondola2"
        geometry={nodes.Gondola2.geometry}
        material={materials["defaultMat.029"]}
        position={[307.816, 418.338, -44.218]}
        rotation={[2.626, 0.253, -2.931]}
        scale={35.648}
      />
      <mesh
        name="Gondola3"
        geometry={nodes.Gondola3.geometry}
        material={materials["defaultMat.030"]}
        position={[262.644, 507.454, 96.781]}
        rotation={[-0.494, -0.179, -0.375]}
        scale={28.988}
      />
      <mesh
        name="River0"
        geometry={nodes.River0.geometry}
        material={materials["defaultMat.032"]}
        position={[-229.921, 585.182, -246.274]}
        rotation={[-0.814, -0.605, -0.536]}
        scale={[10.365, 32.177, 59.672]}
      />
      <mesh
        name="River0001"
        geometry={nodes.River0001.geometry}
        material={materials["defaultMat.039"]}
        position={[-236.841, 598.952, -219.333]}
        rotation={[-0.461, -0.99, -0.293]}
        scale={[21.83, 37.158, 83.394]}
      />
      <mesh
        name="River0005"
        geometry={nodes.River0005.geometry}
        material={materials["defaultMat.044"]}
        position={[-215.634, 580.403, -245.589]}
        rotation={[-1.062, -0.652, -0.483]}
        scale={[16.944, 37.113, 54.092]}
      />
      <mesh
        name="RiverRectangle0"
        geometry={nodes.RiverRectangle0.geometry}
        material={materials["defaultMat.045"]}
        position={[-199.937, 427.037, -409.282]}
        rotation={[-0.627, 0.483, 0.408]}
        scale={[48.17, 48.18, 78.891]}
      />
      <mesh
        name="RiverRectangle0001"
        geometry={nodes.RiverRectangle0001.geometry}
        material={materials["defaultMat.046"]}
        position={[-187.88, 544.591, -286.179]}
        rotation={[-0.697, -0.387, -0.122]}
        scale={[48.71, 50.508, 99.548]}
      />
      <mesh
        name="River0006"
        geometry={nodes.River0006.geometry}
        material={materials["defaultMat.048"]}
        position={[-226.92, 586.368, -246.503]}
        rotation={[-0.804, -0.677, -0.181]}
        scale={[13.294, 37.053, 35.028]}
      />
      <mesh
        name="River0007"
        geometry={nodes.River0007.geometry}
        material={materials["defaultMat.049"]}
        position={[-161.55, 490.03, -348.494]}
        rotation={[-0.792, 0.203, 0.201]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0008"
        geometry={nodes.River0008.geometry}
        material={materials["defaultMat.050"]}
        position={[-197.346, 582.304, -237.612]}
        rotation={[-0.596, -0.567, -0.215]}
        scale={[13.294, 37.053, 35.028]}
      />
      <mesh
        name="River0009"
        geometry={nodes.River0009.geometry}
        material={materials["defaultMat.051"]}
        position={[-204.938, 582.159, -240.464]}
        rotation={[-0.596, -0.567, -0.215]}
        scale={[13.294, 37.053, 35.028]}
      />
      <mesh
        name="River0010"
        geometry={nodes.River0010.geometry}
        material={materials["defaultMat.052"]}
        position={[-210.854, 585.96, -241.306]}
        rotation={[-0.783, -0.567, -0.215]}
        scale={[13.294, 37.053, 35.028]}
      />
      <mesh
        name="River0011"
        geometry={nodes.River0011.geometry}
        material={materials["defaultMat.053"]}
        position={[-203.978, 585.579, -244.977]}
        rotation={[-0.785, -0.567, -0.215]}
        scale={[13.294, 37.053, 35.028]}
      />
      <mesh
        name="River0012"
        geometry={nodes.River0012.geometry}
        material={materials["defaultMat.054"]}
        position={[-182.359, 490.406, -352.103]}
        rotation={[-0.792, 0.203, 0.201]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0013"
        geometry={nodes.River0013.geometry}
        material={materials["defaultMat.055"]}
        position={[-172.919, 459.445, -381.063]}
        rotation={[-0.792, 0.203, 0.201]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0014"
        geometry={nodes.River0014.geometry}
        material={materials["defaultMat.056"]}
        position={[-197.976, 475.788, -372.894]}
        rotation={[-0.792, 0.203, 0.201]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0015"
        geometry={nodes.River0015.geometry}
        material={materials["defaultMat.057"]}
        position={[-182.078, 450.581, -396.574]}
        rotation={[-0.792, 0.203, 0.201]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0016"
        geometry={nodes.River0016.geometry}
        material={materials["defaultMat.058"]}
        position={[-194.604, 462.056, -387.84]}
        rotation={[-0.792, 0.203, 0.201]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0017"
        geometry={nodes.River0017.geometry}
        material={materials["defaultMat.059"]}
        position={[-207.409, 426.252, -431.262]}
        rotation={[-0.792, 0.203, 0.201]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="RiverRectangle0002"
        geometry={nodes.RiverRectangle0002.geometry}
        material={materials["defaultMat.060"]}
        position={[-187.617, 477.099, -368.707]}
        rotation={[-0.674, 0.292, -0.379]}
        scale={[48.71, 50.508, 99.548]}
      />
      <mesh
        name="River0018"
        geometry={nodes.River0018.geometry}
        material={materials["defaultMat.061"]}
        position={[-207.409, 426.252, -431.262]}
        rotation={[-0.792, 0.203, 0.201]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0019"
        geometry={nodes.River0019.geometry}
        material={materials["defaultMat.062"]}
        position={[-239.087, 384.092, -469.874]}
        rotation={[-0.8, 0.844, 0.859]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0020"
        geometry={nodes.River0020.geometry}
        material={materials["defaultMat.063"]}
        position={[-253.057, 383.028, -473.331]}
        rotation={[-0.811, 0.854, 0.874]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0021"
        geometry={nodes.River0021.geometry}
        material={materials["defaultMat.064"]}
        position={[-257.635, 387.692, -470.855]}
        rotation={[-0.703, 0.903, 0.058]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0022"
        geometry={nodes.River0022.geometry}
        material={materials["defaultMat.065"]}
        position={[-217.034, 433.422, -427.734]}
        rotation={[-0.893, 0.245, 0.164]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="RiverRectangle0003"
        geometry={nodes.RiverRectangle0003.geometry}
        material={materials["defaultMat.066"]}
        position={[-324.506, 363.444, -476.564]}
        rotation={[-1.816, 1.245, 1.286]}
        scale={[48.71, 50.508, 99.548]}
      />
      <mesh
        name="River0023"
        geometry={nodes.River0023.geometry}
        material={materials["defaultMat.067"]}
        position={[-258.453, 397.382, -464.079]}
        rotation={[-0.795, 0.903, 0.058]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0024"
        geometry={nodes.River0024.geometry}
        material={materials["defaultMat.068"]}
        position={[-315.527, 368.046, -485.981]}
        rotation={[-1.372, 1.15, 0.824]}
        scale={[21.886, 42.215, 83.397]}
      />
      <mesh
        name="River0025"
        geometry={nodes.River0025.geometry}
        material={materials["defaultMat.069"]}
        position={[-324.591, 378.467, -474.24]}
        rotation={[-2.078, 1.191, 1.462]}
        scale={[19.423, 24.161, 78.726]}
      />
      <mesh
        name="River0026"
        geometry={nodes.River0026.geometry}
        material={materials["defaultMat.070"]}
        position={[-408.384, 329.206, -483.617]}
        rotation={[-1.531, 1.159, 0.881]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0027"
        geometry={nodes.River0027.geometry}
        material={materials["defaultMat.071"]}
        position={[-244.182, 597.437, -209.47]}
        rotation={[-0.491, -0.825, -0.612]}
        scale={[21.83, 37.158, 83.394]}
      />
      <mesh
        name="River0002"
        geometry={nodes.River0002.geometry}
        material={materials["defaultMat.072"]}
        position={[-275.315, 612.094, -184.813]}
        rotation={[-0.197, 0.093, 0.608]}
        scale={[11.252, 19.334, 20.932]}
      />
      <mesh
        name="River0003"
        geometry={nodes.River0003.geometry}
        material={materials["defaultMat.073"]}
        position={[-268.877, 608.97, -179.786]}
        rotation={[-0.164, 0.683, 0.69]}
        scale={[11.252, 19.334, 20.932]}
      />
      <mesh
        name="River0004"
        geometry={nodes.River0004.geometry}
        material={materials["defaultMat.074"]}
        position={[-425.655, 323.858, -472.908]}
        rotation={[-1.361, 1.146, 0.882]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0028"
        geometry={nodes.River0028.geometry}
        material={materials["defaultMat.076"]}
        position={[-431.724, 336.11, -441.626]}
        rotation={[-2.365, 0.956, 1.981]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0030"
        geometry={nodes.River0030.geometry}
        material={materials["defaultMat.079"]}
        position={[-481.045, 298.447, -459.238]}
        rotation={[-2.469, 0.867, 2.112]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0031"
        geometry={nodes.River0031.geometry}
        material={materials["defaultMat.080"]}
        position={[-502.265, 294.522, -426.499]}
        rotation={[-2.469, 0.867, 2.112]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0032"
        geometry={nodes.River0032.geometry}
        material={materials["defaultMat.081"]}
        position={[-518.47, 303.679, -404.724]}
        rotation={[-2.686, 0.972, 2.384]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0033"
        geometry={nodes.River0033.geometry}
        material={materials["defaultMat.082"]}
        position={[-549.106, 279.302, -401.905]}
        rotation={[-2.263, 0.883, 1.556]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0029"
        geometry={nodes.River0029.geometry}
        material={materials["defaultMat.084"]}
        position={[-422.718, 336.258, -455.797]}
        rotation={[-2.365, 0.956, 1.981]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0034"
        geometry={nodes.River0034.geometry}
        material={materials["defaultMat.086"]}
        position={[-534.882, 276.681, -411.643]}
        rotation={[-2.686, 0.972, 2.384]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0035"
        geometry={nodes.River0035.geometry}
        material={materials["defaultMat.087"]}
        position={[-585.432, 284.93, -339.28]}
        rotation={[2.998, 0.174, 2.337]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0036"
        geometry={nodes.River0036.geometry}
        material={materials["defaultMat.088"]}
        position={[-598.998, 271.555, -349.376]}
        rotation={[-3.109, 0.546, 2.325]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0037"
        geometry={nodes.River0037.geometry}
        material={materials["defaultMat.089"]}
        position={[-607.234, 284.408, -272.219]}
        rotation={[3.109, 0.166, 2.305]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0038"
        geometry={nodes.River0038.geometry}
        material={materials["defaultMat.091"]}
        position={[-596.053, 278.63, -334.981]}
        rotation={[-2.914, 0.683, 2.319]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0039"
        geometry={nodes.River0039.geometry}
        material={materials["defaultMat.092"]}
        position={[-610.589, 285.302, -197.964]}
        rotation={[-3.109, 0.137, 2.358]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0040"
        geometry={nodes.River0040.geometry}
        material={materials["defaultMat.093"]}
        position={[-615.054, 271.858, -262.047]}
        rotation={[-3.124, 0.349, 1.806]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0041"
        geometry={nodes.River0041.geometry}
        material={materials["defaultMat.094"]}
        position={[-624.901, 276.49, -186.751]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0042"
        geometry={nodes.River0042.geometry}
        material={materials["defaultMat.095"]}
        position={[-622.029, 265.851, -174.272]}
        rotation={[-3.124, 0.349, 1.806]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0043"
        geometry={nodes.River0043.geometry}
        material={materials["defaultMat.096"]}
        position={[-623.67, 277.303, -134.853]}
        rotation={[-3.124, 0.349, 1.806]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0044"
        geometry={nodes.River0044.geometry}
        material={materials["defaultMat.097"]}
        position={[-630.161, 266.563, -99.101]}
        rotation={[-3.124, 0.22, 1.809]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0045"
        geometry={nodes.River0045.geometry}
        material={materials["defaultMat.098"]}
        position={[-618.641, 272.045, -260.106]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0046"
        geometry={nodes.River0046.geometry}
        material={materials["defaultMat.099"]}
        position={[-651.304, 259.385, -43.245]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0047"
        geometry={nodes.River0047.geometry}
        material={materials["defaultMat.100"]}
        position={[-646.474, 262.302, -117.069]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0048"
        geometry={nodes.River0048.geometry}
        material={materials["defaultMat.101"]}
        position={[-655.354, 261.548, 6.158]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0049"
        geometry={nodes.River0049.geometry}
        material={materials["defaultMat.102"]}
        position={[-655.349, 262.309, -157.121]}
        rotation={[-2.976, 0.117, 2.192]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0050"
        geometry={nodes.River0050.geometry}
        material={materials["defaultMat.103"]}
        position={[-644.244, 251.294, -118.89]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0051"
        geometry={nodes.River0051.geometry}
        material={materials["defaultMat.104"]}
        position={[-646.651, 256.111, -126.368]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0052"
        geometry={nodes.River0052.geometry}
        material={materials["defaultMat.105"]}
        position={[-666.068, 251.562, -3.502]}
        rotation={[3.03, -0.348, 2.478]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="RiverRectangle0004"
        geometry={nodes.RiverRectangle0004.geometry}
        material={materials["defaultMat.107"]}
        position={[-831.697, 107.156, -153.206]}
        rotation={[-3.041, 0.53, -0.349]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="RiverRectangle0005"
        geometry={nodes.RiverRectangle0005.geometry}
        material={materials["defaultMat.108"]}
        position={[-910.773, 80.996, 111.39]}
        rotation={[3.126, 0.051, -0.589]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="RiverRectangle0006"
        geometry={nodes.RiverRectangle0006.geometry}
        material={materials["defaultMat.109"]}
        position={[-904.166, 97.257, 108.942]}
        rotation={[3.126, 0.003, -0.59]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="RiverRectangle0007"
        geometry={nodes.RiverRectangle0007.geometry}
        material={materials["defaultMat.110"]}
        position={[-841.031, 120.47, 10.295]}
        rotation={[3.126, 0.051, -0.589]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="RiverRectangle0008"
        geometry={nodes.RiverRectangle0008.geometry}
        material={materials["defaultMat.111"]}
        position={[-744.536, 173.544, 140.81]}
        rotation={[-2.086, 1.114, -0.829]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="RiverRectangle0009"
        geometry={nodes.RiverRectangle0009.geometry}
        material={materials["defaultMat.112"]}
        position={[-835.509, 121.122, -20.765]}
        rotation={[3.126, 0.051, -0.589]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="RiverRectangle0010"
        geometry={nodes.RiverRectangle0010.geometry}
        material={materials["defaultMat.113"]}
        position={[-835.509, 121.122, -20.765]}
        rotation={[3.126, 0.051, -0.589]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="RiverRectangle0011"
        geometry={nodes.RiverRectangle0011.geometry}
        material={materials["defaultMat.114"]}
        position={[-811.806, 128.919, -132.573]}
        rotation={[2.972, 0.066, -0.676]}
        scale={[-126.002, -195.542, -216.96]}
      />
      <mesh
        name="River0053"
        geometry={nodes.River0053.geometry}
        material={materials["defaultMat.115"]}
        position={[-669.411, 254.009, 80.605]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0054"
        geometry={nodes.River0054.geometry}
        material={materials["defaultMat.116"]}
        position={[-678.408, 249.485, 129.182]}
        rotation={[-3.017, 0.479, 2.527]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0055"
        geometry={nodes.River0055.geometry}
        material={materials["defaultMat.117"]}
        position={[-685.58, 245.468, 128.149]}
        rotation={[-2.147, 1.332, 2.426]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="RiverRectangle0012"
        geometry={nodes.RiverRectangle0012.geometry}
        material={materials["defaultMat.118"]}
        position={[-834.528, 123.901, -12.408]}
        rotation={[3.051, -0.188, -0.593]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="River0056"
        geometry={nodes.River0056.geometry}
        material={materials["defaultMat.119"]}
        position={[-673.028, 242.978, -91.218]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0057"
        geometry={nodes.River0057.geometry}
        material={materials["defaultMat.120"]}
        position={[-673.028, 242.978, -91.218]}
        rotation={[-3.03, 0.17, 2.566]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0058"
        geometry={nodes.River0058.geometry}
        material={materials["defaultMat.121"]}
        position={[-684.007, 244.016, 25.384]}
        rotation={[-3.122, 0.091, 2.469]}
        scale={[32.594, 49.328, 99.138]}
      />
      <mesh
        name="River0059"
        geometry={nodes.River0059.geometry}
        material={materials["defaultMat.122"]}
        position={[-732.717, 212.719, 178.175]}
        rotation={[-1.978, 0.879, 2.278]}
        scale={[32.712, 49.92, 103.021]}
      />
      <mesh
        name="River0060"
        geometry={nodes.River0060.geometry}
        material={materials["defaultMat.123"]}
        position={[-742.558, 212.719, 157.822]}
        rotation={[-1.978, 0.879, 2.278]}
        scale={[32.712, 49.92, 103.021]}
      />
      <mesh
        name="River0061"
        geometry={nodes.River0061.geometry}
        material={materials["defaultMat.124"]}
        position={[-751.557, 219.045, 142.084]}
        rotation={[-1.978, 0.879, 2.278]}
        scale={[32.712, 49.92, 103.021]}
      />
      <mesh
        name="River0062"
        geometry={nodes.River0062.geometry}
        material={materials["defaultMat.125"]}
        position={[-731.367, 217.78, 183.262]}
        rotation={[-1.978, 0.879, 2.278]}
        scale={[32.712, 49.92, 103.021]}
      />
      <mesh
        name="RiverRectangle0013"
        geometry={nodes.RiverRectangle0013.geometry}
        material={materials["defaultMat.126"]}
        position={[-910.773, 80.996, 111.39]}
        rotation={[3.126, 0.051, -0.589]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="RiverRectangle0014"
        geometry={nodes.RiverRectangle0014.geometry}
        material={materials["defaultMat.127"]}
        position={[-917.409, 67.527, 244.197]}
        rotation={[-2.923, 0.089, -0.494]}
        scale={[-163.413, -253.6, -281.377]}
      />
      <mesh
        name="RiverRectangle0015"
        geometry={nodes.RiverRectangle0015.geometry}
        material={materials["defaultMat.128"]}
        position={[-850.113, 108.719, 261.435]}
        rotation={[0.477, -0.65, -2.65]}
        scale={[-108.058, -167.695, -186.063]}
      />
      <mesh
        name="RiverRectangle0016"
        geometry={nodes.RiverRectangle0016.geometry}
        material={materials["defaultMat.129"]}
        position={[-807.642, 147.953, -197.496]}
        rotation={[2.845, -0.01, -0.423]}
        scale={[-80.407, -124.784, -138.452]}
      />
      <mesh
        name="RiverRectangle0017"
        geometry={nodes.RiverRectangle0017.geometry}
        material={materials["defaultMat.130"]}
        position={[-806.173, 167.959, -62.899]}
        rotation={[3.094, -0.01, -0.423]}
        scale={[-80.407, -124.784, -138.452]}
      />
      <mesh
        name="RiverRectangle0018"
        geometry={nodes.RiverRectangle0018.geometry}
        material={materials["defaultMat.131"]}
        position={[-897.946, 106.353, 276.973]}
        rotation={[2.062, -1.082, -1.557]}
        scale={[-62.182, -96.5, -107.07]}
      />
      <mesh
        name="RiverRectangle0019"
        geometry={nodes.RiverRectangle0019.geometry}
        material={materials["defaultMat.132"]}
        position={[-897.25, 99.012, 266.539]}
        rotation={[0.569, -0.573, -2.49]}
        scale={[-62.182, -96.5, -107.07]}
      />
      <mesh
        name="River0063"
        geometry={nodes.River0063.geometry}
        material={materials["defaultMat.134"]}
        position={[-722.837, 232.78, 124.769]}
        rotation={[-1.541, 1.19, 1.466]}
        scale={[32.638, 54.968, 157.568]}
      />
      <mesh
        name="PineTree0001"
        geometry={nodes.PineTree0001.geometry}
        material={materials["Material_0.022"]}
        position={[-979.289, 99.487, -78.844]}
        rotation={[-3.063, 0.801, 3.127]}
        scale={[78.704, 78.705, 78.705]}
      />
      <mesh
        name="PineTree0002"
        geometry={nodes.PineTree0002.geometry}
        material={materials["Material_0.023"]}
        position={[-962.672, 140.048, -129.657]}
        rotation={[0.254, -0.896, 0.336]}
        scale={133.177}
      />
      <mesh
        name="PineTree0003"
        geometry={nodes.PineTree0003.geometry}
        material={materials["Material_0.024"]}
        position={[-939.933, 113.273, -179.563]}
        rotation={[3.088, 0.675, 3.118]}
        scale={78.705}
      />
      <mesh
        name="PineTree0004"
        geometry={nodes.PineTree0004.geometry}
        material={materials["Material_0.025"]}
        position={[-913.602, 133.801, -230.475]}
        rotation={[0.248, -0.918, 0.221]}
        scale={100.462}
      />
      <mesh
        name="PineTree0005"
        geometry={nodes.PineTree0005.geometry}
        material={materials["Material_0.026"]}
        position={[-877.411, 148.372, -306.244]}
        rotation={[-3.02, 0.712, 2.934]}
        scale={112.606}
      />
      <mesh
        name="PineTree0006"
        geometry={nodes.PineTree0006.geometry}
        material={materials["Material_0.027"]}
        position={[-816.34, 172.65, -348.554]}
        rotation={[-3.058, 0.716, 2.991]}
        scale={[116.019, 116.019, 116.018]}
      />
      <mesh
        name="PineTree0007"
        geometry={nodes.PineTree0007.geometry}
        material={materials["Material_0.028"]}
        position={[-751.686, 222.383, -276.322]}
        rotation={[-3.058, 0.716, 2.991]}
        scale={102.323}
      />
      <mesh
        name="PineTree0008"
        geometry={nodes.PineTree0008.geometry}
        material={materials["Material_0.029"]}
        position={[-778.187, 210.982, -323.354]}
        rotation={[-3.058, 0.716, 2.991]}
        scale={[134.873, 134.872, 134.872]}
      />
      <mesh
        name="PineTree0009"
        geometry={nodes.PineTree0009.geometry}
        material={materials["Material_0.030"]}
        position={[-765.31, 248.15, -214.414]}
        rotation={[-0.064, -0.119, -0.103]}
        scale={134.872}
      />
      <mesh
        name="PineTree0010"
        geometry={nodes.PineTree0010.geometry}
        material={materials["Material_0.031"]}
        position={[-732.67, 268.153, -98.801]}
        rotation={[-0.064, -0.119, -0.103]}
        scale={134.872}
      />
      <mesh
        name="PineTree0011"
        geometry={nodes.PineTree0011.geometry}
        material={materials["Material_0.032"]}
        position={[-698.41, 277.105, -47.569]}
        rotation={[-3.106, 0.022, Math.PI]}
        scale={96.527}
      />
      <mesh
        name="PineTree0012"
        geometry={nodes.PineTree0012.geometry}
        material={materials["Material_0.033"]}
        position={[-729.615, 248.232, -165.134]}
        rotation={[-3.106, 0.022, Math.PI]}
        scale={96.527}
      />
      <mesh
        name="PineTree0013"
        geometry={nodes.PineTree0013.geometry}
        material={materials["Material_0.034"]}
        position={[-652.167, 323.487, 129.777]}
        rotation={[0.029, -0.414, -0.015]}
        scale={95.605}
      />
      <mesh
        name="PineTree0014"
        geometry={nodes.PineTree0014.geometry}
        material={materials["Material_0.035"]}
        position={[-742.569, 274.461, 3.378]}
        rotation={[-2.444, 1.452, 2.502]}
        scale={134.03}
      />
      <mesh
        name="PineTree2001"
        geometry={nodes.PineTree2001.geometry}
        material={materials["Material_0.036"]}
        position={[-1025.524, 98.016, 72.337]}
        rotation={[0.219, -0.923, 0.183]}
        scale={104.618}
      />
      <mesh
        name="PineTree2002"
        geometry={nodes.PineTree2002.geometry}
        material={materials["Material_0.037"]}
        position={[-1013.639, 89.811, 129.717]}
        rotation={[-2.931, 0.913, 2.947]}
        scale={86.321}
      />
      <mesh
        name="PineTree2003"
        geometry={nodes.PineTree2003.geometry}
        material={materials["Material_0.038"]}
        position={[-1069.032, 66.855, 121.941]}
        rotation={[0.219, -0.923, 0.183]}
        scale={104.618}
      />
      <mesh
        name="PineTree2004"
        geometry={nodes.PineTree2004.geometry}
        material={materials["Material_0.039"]}
        position={[-1056.588, 75.007, 187.383]}
        rotation={[-2.66, 1.185, 2.734]}
        scale={104.618}
      />
      <mesh
        name="PineTree2005"
        geometry={nodes.PineTree2005.geometry}
        material={materials["Material_0.040"]}
        position={[-1024.543, 78.538, 242.355]}
        rotation={[-2.262, -1.492, -2.225]}
        scale={104.618}
      />
      <mesh
        name="PineTree2006"
        geometry={nodes.PineTree2006.geometry}
        material={materials["Material_0.041"]}
        position={[-1024.543, 78.538, 242.355]}
        rotation={[-2.262, -1.492, -2.225]}
        scale={104.618}
      />
      <mesh
        name="PineTree2007"
        geometry={nodes.PineTree2007.geometry}
        material={materials["Material_0.042"]}
        position={[-1024.573, 90.838, 286.407]}
        rotation={[-2.262, -1.492, -2.225]}
        scale={134.573}
      />
      <mesh
        name="SmoothBoulders0"
        geometry={nodes.SmoothBoulders0.geometry}
        material={materials["defaultMat.136"]}
        position={[-1003.75, 55.776, 392.388]}
        rotation={[0, 0, 0.575]}
        scale={116.459}
      />
      <mesh
        name="PineTree0015"
        geometry={nodes.PineTree0015.geometry}
        material={materials["Material_0.043"]}
        position={[-632.033, 317.46, 261.155]}
        rotation={[-2.915, 1.051, 3.017]}
        scale={134.03}
      />
      <mesh
        name="PineTree0016"
        geometry={nodes.PineTree0016.geometry}
        material={materials["Material_0.044"]}
        position={[-698.141, 254.641, 369.732]}
        rotation={[0.251, -1.201, 0.21]}
        scale={139.923}
      />
      <mesh
        name="PineTree0017"
        geometry={nodes.PineTree0017.geometry}
        material={materials["Material_0.045"]}
        position={[-698.133, 245.895, 306.989]}
        rotation={[0.12, -1.211, 0.07]}
        scale={91.287}
      />
      <mesh
        name="PineTree0018"
        geometry={nodes.PineTree0018.geometry}
        material={materials["Material_0.046"]}
        position={[-498.126, 314.686, -477.889]}
        rotation={[-0.003, -0.413, 0.13]}
        scale={113.066}
      />
      <mesh
        name="PineTree0019"
        geometry={nodes.PineTree0019.geometry}
        material={materials["Material_0.047"]}
        position={[-501.514, 390.133, -378.729]}
        rotation={[3.075, 1.056, -3.072]}
        scale={111.333}
      />
      <mesh
        name="PineTree0020"
        geometry={nodes.PineTree0020.geometry}
        material={materials["Material_0.048"]}
        position={[-617.939, 294.53, -403.502]}
        rotation={[-2.238, 1.446, 2.244]}
        scale={111.333}
      />
      <mesh
        name="JaggedBoulders0"
        geometry={nodes.JaggedBoulders0.geometry}
        material={materials["defaultMat.137"]}
        position={[-902.849, 116.25, 415.302]}
        rotation={[-1.401, 1.042, 1.609]}
        scale={122.523}
      />
      <mesh
        name="SmoothBoulders0001"
        geometry={nodes.SmoothBoulders0001.geometry}
        material={materials["defaultMat.138"]}
        position={[-749.87, 174.69, 246.205]}
        rotation={[0.405, 0, 0.505]}
        scale={116.459}
      />
      <mesh
        name="JaggedBoulders0001"
        geometry={nodes.JaggedBoulders0001.geometry}
        material={materials["defaultMat.139"]}
        position={[-793.293, 164.423, 323.507]}
        rotation={[2.068, -1.01, 1.872]}
        scale={77.53}
      />
      <mesh
        name="SmoothBoulders0002"
        geometry={nodes.SmoothBoulders0002.geometry}
        material={materials["defaultMat.140"]}
        position={[-853.186, 134.578, 334.075]}
        rotation={[0, 0, 0.575]}
        scale={46.021}
      />
      <mesh
        name="PineTree2008"
        geometry={nodes.PineTree2008.geometry}
        material={materials["Material_0.050"]}
        position={[-883.393, 147.575, 494.79]}
        rotation={[-0.042, -0.984, -0.094]}
        scale={136.05}
      />
      <mesh
        name="Kayak"
        geometry={nodes.Kayak.geometry}
        material={materials["defaultMat.141"]}
        position={[-894.92, 165.186, 30.414]}
        rotation={[0, 1.544, 0]}
        scale={99.901}
      />
      <mesh
        name="Paddle12"
        geometry={nodes.Paddle12.geometry}
        material={materials["defaultMat.143"]}
        position={[-912.131, 158.608, 28.306]}
        rotation={[0.035, 0, 2.098]}
        scale={34.565}
      />
      <mesh
        name="MaleSkier1"
        geometry={nodes.MaleSkier1.geometry}
        material={materials["Material_0.051"]}
        position={[360.994, 381.364, 206.211]}
        rotation={[2.857, -0.018, -2.804]}
        scale={17.829}
      />
      <mesh
        name="MaleSkier0"
        geometry={nodes.MaleSkier0.geometry}
        material={materials["Material_0.052"]}
        position={[416.407, 241.658, -264.454]}
        rotation={[1.139, 0.844, -1.163]}
        scale={17.829}
      />
      <mesh
        name="FemaleSkier0"
        geometry={nodes.FemaleSkier0.geometry}
        material={materials["Material_0.053"]}
        position={[285.765, 437.086, 63.546]}
        rotation={[1.655, 0.754, -1.604]}
        scale={23.039}
      />
      <mesh
        name="FemaleSkier1"
        geometry={nodes.FemaleSkier1.geometry}
        material={materials["Material_0.054"]}
        position={[419.151, 291.077, -47.567]}
        rotation={[Math.PI, -0.009, Math.PI]}
        scale={21.448}
      />
      <mesh
        name="SnowyPineTree11001"
        geometry={nodes.SnowyPineTree11001.geometry}
        material={materials["defaultMat.145"]}
        position={[680.187, 185.353, -122.282]}
        rotation={[2.134, 1.318, -2.119]}
        scale={106.121}
      />
      <mesh
        name="SnowyPineTree11002"
        geometry={nodes.SnowyPineTree11002.geometry}
        material={materials["defaultMat.146"]}
        position={[741.459, 171.877, -109.709]}
        rotation={[0.359, 1.01, -0.477]}
        scale={117.125}
      />
      <mesh
        name="Houses0"
        geometry={nodes.Houses0.geometry}
        material={materials["defaultMat.147"]}
        position={[96.792, 115.152, 882.591]}
        rotation={[-0.187, -1.316, -0.193]}
        scale={169.598}
      />
      <mesh
        name="Skyscrapers3"
        geometry={nodes.Skyscrapers3.geometry}
        material={materials["Material_0.055"]}
        position={[-206.463, 219.521, 789.784]}
        rotation={[-2.793, -1.249, -3.005]}
        scale={175.102}
      />
      <mesh
        name="Bow0"
        geometry={nodes.Bow0.geometry}
        material={materials["Material_0.056"]}
        position={[174.313, 239.43, 721.166]}
        rotation={[-Math.PI, 0.124, -Math.PI]}
        scale={128.402}
      />
      <mesh
        name="CalgaryTower"
        geometry={nodes.CalgaryTower.geometry}
        material={materials["Material_0.057"]}
        position={[109.285, 218.273, 790.693]}
        scale={174.747}
      />
      <mesh
        name="City"
        geometry={nodes.City.geometry}
        material={materials["Material_0.058"]}
        position={[-39.916, 224.896, 774.674]}
        rotation={[0.147, 0, 0]}
        scale={401.819}
      />
      <mesh
        name="Houses1"
        geometry={nodes.Houses1.geometry}
        material={materials["defaultMat.148"]}
        position={[-184.273, 129.984, 874.265]}
        rotation={[-2.932, -1.396, 0.086]}
        scale={[-199.217, -198.234, -213.304]}
      />
      <mesh
        name="Skyscrapers0"
        geometry={nodes.Skyscrapers0.geometry}
        material={materials["Material_0.059"]}
        position={[-129.477, 215.363, 785.849]}
        rotation={[-3, 0.158, -3.115]}
        scale={175.102}
      />
      <mesh
        name="Skyscrapers1"
        geometry={nodes.Skyscrapers1.geometry}
        material={materials["Material_0.060"]}
        position={[49.414, 224.517, 753.756]}
        rotation={[-3.07, 0.159, -3.101]}
        scale={175.102}
      />
      <mesh
        name="Skyscrapers2"
        geometry={nodes.Skyscrapers2.geometry}
        material={materials["Material_0.061"]}
        position={[20.511, 195.581, 823.027]}
        rotation={[-3.106, 0.228, 3.121]}
        scale={175.102}
      />
      <mesh
        name="CanadianFlag"
        geometry={nodes.CanadianFlag.geometry}
        material={materials["Material_0.062"]}
        position={[-107.574, 992.313, -197.616]}
        rotation={[-0.355, 1.368, -0.016]}
        scale={118.649}
      />
      <mesh
        name="SerbianFlag"
        geometry={nodes.SerbianFlag.geometry}
        material={materials["Material_0.064"]}
        position={[-91.111, 841.547, -5.341]}
        rotation={[1.438, -1.442, 1.136]}
        scale={356.725}
      />
      <mesh
        name="Bow0001"
        geometry={nodes.Bow0001.geometry}
        material={materials["Material_0.065"]}
        position={[198.596, 240.922, 725.255]}
        rotation={[-Math.PI, 0.011, -Math.PI]}
        scale={128.402}
      />
      <mesh
        name="WindowBuilding"
        geometry={nodes.WindowBuilding.geometry}
        material={materials["Material_0.066"]}
        position={[22.596, 142.64, 869.057]}
        rotation={[-Math.PI, 0.072, -Math.PI]}
        scale={88.601}
      />
      <mesh
        name="OfficeBuilding"
        geometry={nodes.OfficeBuilding.geometry}
        material={materials["Material_0.067"]}
        position={[164.933, 163.756, 866.884]}
        scale={100.065}
      />
      <mesh
        name="OfficeBuilding001"
        geometry={nodes.OfficeBuilding001.geometry}
        material={materials["Material_0.068"]}
        position={[164.933, 163.756, 812.999]}
        scale={100.065}
      />
      <mesh
        name="OfficeBuilding002"
        geometry={nodes.OfficeBuilding002.geometry}
        material={materials["Material_0.069"]}
        position={[-205.009, 163.756, 866.884]}
        scale={100.065}
      />
      <mesh
        name="OfficeBuilding003"
        geometry={nodes.OfficeBuilding003.geometry}
        material={materials["Material_0.070"]}
        position={[109.559, 139.885, 854.951]}
        rotation={[-Math.PI, 0.017, -Math.PI]}
        scale={100.065}
      />
      <mesh
        name="OfficeBuilding004"
        geometry={nodes.OfficeBuilding004.geometry}
        material={materials["Material_0.071"]}
        position={[-58.153, 134.727, 870.254]}
        rotation={[Math.PI, -1.371, Math.PI]}
        scale={100.065}
      />
      <mesh
        name="OfficeBuilding005"
        geometry={nodes.OfficeBuilding005.geometry}
        material={materials["Material_0.072"]}
        position={[-142.62, 135.876, 864.054]}
        rotation={[0, 1.549, 0]}
        scale={100.065}
      />
      <mesh
        name="Hospital"
        geometry={nodes.Hospital.geometry}
        material={materials["Material_0.074"]}
        position={[-30.912, 112.281, 886.966]}
        scale={118.993}
      />
    </a.group>
  );
};

export default Island;
