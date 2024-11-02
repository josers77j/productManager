import React, { LegacyRef, useRef } from 'react';
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
} from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { Box, Button, Heading, Grid } from '@chakra-ui/react';

type ModalSkeletonProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  gridTemplateColumns?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ModalSkeleton: React.FC<ModalSkeletonProps> = ({
  isOpen,
  onClose,
  title,
  children,
  gridTemplateColumns = '1fr',
  onSubmit,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps } = useOverlay(
    { isOpen, onClose, isDismissable: true },
    ref
  );
  usePreventScroll();
  const { modalProps } = useModal();
  const { dialogProps } = useDialog({}, ref);

  return (
    <OverlayContainer>
      <FocusScope contain restoreFocus>
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={999}
        />
      <Box
  {...overlayProps}
  {...dialogProps}
  {...modalProps}
  ref={ref as unknown as LegacyRef<HTMLFormElement>}
  bg="white"
  p={6}
  borderRadius="md"
  boxShadow="lg"
  maxWidth="50%"
  mx="auto"
  zIndex={1000}
  position="fixed"
  top="50%"
  left="50%"
  transform="translate(-50%, -50%)"
  as="form"
  onSubmit={onSubmit}
>
  <Heading mb={4}>{title}</Heading>
  <Grid templateColumns={gridTemplateColumns} gap={6}>
    {children}
  </Grid>
  <Box mt={4} display="flex" justifyContent="flex-end">
    <Button colorScheme="teal" type="submit" mr={3}>
      Crear
    </Button>
    <Button variant="outline" onClick={onClose}>
      Cerrar
    </Button>
  </Box>
</Box>

      </FocusScope>
    </OverlayContainer>
  );
};

export default ModalSkeleton;
