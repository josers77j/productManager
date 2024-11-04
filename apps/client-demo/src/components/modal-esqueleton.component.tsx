import React, { forwardRef, LegacyRef } from 'react';
import { Box, Button, Grid, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { OverlayContainer } from '@react-aria/overlays';
import { FocusLock } from '@chakra-ui/react';

const MotionBox = motion(
  forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>((props, ref) => (
    <Box ref={ref} {...props} />
  ))
);

const MotionBackdrop = motion(
  forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>((props, ref) => (
    <Box ref={ref} {...props} />
  ))
);

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }, // Solo se modifica el opacity para el desvanecimiento
};

interface ModalSkeletonProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  children: React.ReactNode;
  gridTemplateColumns: string;
  modalProps?: any;
  ref?: React.Ref<HTMLFormElement>;
}

const ModalSkeleton: React.FC<ModalSkeletonProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  gridTemplateColumns,
  modalProps,
  ref,
}) => {
  // Función para detectar clic fuera del modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Cierra el modal si se hace clic fuera (en el backdrop)
    }
  };

  return (
    <OverlayContainer>
      <FocusLock>
        {isOpen && (
          <MotionBackdrop
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.600"
            zIndex={999}
            onClick={handleBackdropClick}
            className="flex items-center justify-center"
          />
        )}
        <MotionBox
          {...modalProps}
          ref={ref as unknown as LegacyRef<HTMLFormElement>}
          bg="white"
          p={6}
          width={{ base: '90%', md: '60%' }}
          borderRadius="md"
          boxShadow="lg"
          zIndex={1000}
          position="fixed"
          top={{ base: '20%', md: '20%' }}
          left={{ base: '5%', md: '20%' }}
          transform="translateX(-50%)"
          as="form"
          onSubmit={onSubmit}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.3, ease: 'easeInOut' }} // Agregar la transición aquí
        >
          <Heading mb={4}>{title}</Heading>
          <Grid templateColumns={gridTemplateColumns} gap={5}>
            {children}
          </Grid>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </Box>
        </MotionBox>
      </FocusLock>
    </OverlayContainer>
  );
};

export default ModalSkeleton;
