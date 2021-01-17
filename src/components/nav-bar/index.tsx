import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Badge from '../../components/badge';
import { NominationsContext } from '../../context/nominations-context';
import NominationsModal from '../nominations-modal';
import { AnimatePresence, motion } from 'framer-motion';
import { device } from '../../constants/device';
import { MdStar, MdArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

const Navbar: React.FC<{ showBack?: boolean }> = ({ showBack }) => {
  const { nominations } = useContext(NominationsContext);
  const [showNominations, setShowNominations] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (nominations.length === 5) {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [nominations])

  return (
    <Container>
      <MainBar>
        {showBack && (
          <BackArrow onClick={() => history.goBack()} fontSize="2rem" />
        )}
        <Title>Shoppies</Title>
        <Star length={nominations.length}>
          <Badge badgeContent={nominations.length} colour='#5299D3 '>
            <MdStar
              onClick={() => setShowNominations(!showNominations)}
              fontSize="2rem"
            />
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
            <BannerText>✨Thanks for nominating 5 movies!✨</BannerText>
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
  z-index: 1;
  @media ${device.desktop} {
    padding: 1% 0;
  }
`;

const BackArrow = styled(MdArrowBack)`
  color: white;
  position: absolute;
  left: 5%;
  @media ${device.desktop} {
    left: 3%;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #faf9f9;
  font-size: 2rem;
`;

const Star = styled.div<{ length: number }>`
  color: ${(props) => (props.length === 5 ? 'gold' : 'white')};
  position: absolute;
  right: 5%;
  @media ${device.desktop} {
    right: 3%;
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
  @media ${device.desktop} {
    margin: 2%;
    font-size: 2rem;
  }
`;

export default Navbar;
