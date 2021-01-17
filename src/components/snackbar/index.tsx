import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AlertContext } from '../../context/alert-context';
import Notification from './notification';

type Props = {
  autoHideDuration?: number;
};

const Snackbar: React.FC<Props> = ({ autoHideDuration }) => {
  const { alert, showAlert, setShowAlert } = useContext(AlertContext);

  useEffect(() => {
    if (autoHideDuration) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [showAlert, autoHideDuration, setShowAlert]);

  return (
    <AnimatePresence exitBeforeEnter>
      {showAlert && (
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
