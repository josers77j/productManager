// MotionBox.tsx
import React, { forwardRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Crear un componente MotionBox usando forwardRef
const MotionBox = motion(
  forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>((props, ref) => (
    <Box ref={ref} {...props} />
  ))
);

export default MotionBox;
