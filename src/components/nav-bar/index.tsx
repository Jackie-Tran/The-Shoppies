import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/Star';
import { Badge } from '@material-ui/core';
import { NominationsContext } from '../../context/nominations-context';
import NominationsModal from '../nominations-modal';
import { AnimatePresence, motion } from 'framer-motion';
import { device } from '../../constants/device';

const Navbar: React.FC = () => {
  const { nominations } = useContext(NominationsContext);
  const [showNominations, setShowNominations] = useState<boolean>(false);

  return (
    <Container>
      <MainBar>
        <Title>Shoppies</Title>
        <Star length={nominations.length}>
          <Badge badgeContent={nominations.length} color="primary">
            <StarIcon onClick={() => setShowNominations(!showNominations)} />
          </Badge>
          <NominationsModal
            isShowing={showNominations}
            setIsShowing={setShowNominations}
          />
        </Star>
      </MainBar>
      <AnimatePresence exitBeforeEnter>
        {nominations.length === 5 && (
          <Banner
            variants={bannerVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <BannerText>
                ✨Thanks for nominating 5 movies!✨
            </BannerText>
          </Banner>
        )}
      </AnimatePresence>
    </Container>
  );
};

const bannerVariant = {
  visible: { height: 'auto' },
  hidden: { height: 0 },
};

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const MainBar = styled.div`
  background-color: #3f424f;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3% 0;
  z-index: 2;
  @media ${device.desktop} {
      padding: 1% 0;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #faf9f9;
  font-size: 2rem;
`;

const Star = styled.div<{ length: number }>`
  color: ${(props) => (props.length === 5 ? 'gold' : 'white')};
  margin-right: 5%;
  position: absolute;
  right: 0;
  @media ${device.desktop} {
      margin-right: 3%;
  }
`;

const Banner = styled(motion.div)`
  background-color: #3d5a80;
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  text-align: center;
  width: 100%;
  margin: 0;
  overflow: hidden;
  z-index: 1;
`;

const BannerText = styled(motion.p)`
    margin: 3%;
`;

export default Navbar;
