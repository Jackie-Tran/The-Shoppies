import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AlertContext } from '../../context/alert-context';
import Notification from './notification';

type Props = {
  autoHideDuration?: number;
};

const Snackbar: React.FC<Props> = ({ autoHideDuration }) => {
  const { alert, open, setOpen } = useContext(AlertContext);

  useEffect(() => {
    if (autoHideDuration) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <AnimatePresence exitBeforeEnter>
      {open && (
        <Container
            variants={snackbar}
            initial='hidden'
            animate='visible'
            exit='hidden'
        >
          <Notification severity={alert.severity} message={alert.message} />
        </Container>
      )}
    </AnimatePresence>
  );
};

const snackbar = {
  visible: { bottom: '1rem' },
  hidden: { bottom: '-5rem' },
};

const Container = styled(motion.div)`
  position: fixed;
  width: 100%;
  bottom: 1rem;
`;

export default Snackbar;
