import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

type Props = {
  badgeContent?: string | number;
  colour?: string;
};

const Badge: React.FC<Props> = ({ badgeContent, colour, children }) => {
  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        {badgeContent && (
          <BadgeContent
            variants={badge}
            initial="empty"
            animate="full"
            exit="empty"
            transition={{ type: 'spring', duration: 0.8, bounce: 0.5 }}
            colour={colour}
          >
            {badgeContent}
          </BadgeContent>
        )}
      </AnimatePresence>
      {children}
    </Container>
  );
};

const badge = {
  full: { scale: 1 },
  empty: { scale: 0 },
};

const Container = styled.div``;

const BadgeContent = styled(motion.div)<{ colour?: string }>`
    background-color: ${props => props.colour ? props.colour : '#489FB5'};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -0.5rem;
    top: -0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    font-size: 1rem;
    color: white;
`;

export default Badge;
