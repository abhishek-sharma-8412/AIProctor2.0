import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiShield } from 'react-icons/fi';
import Lottie from 'lottie-react';
import proctorAnimation from '../assets/ai-proctor.json';

const LandingContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--card-bg);
  box-shadow: var(--shadow);
`;

const LoginButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.variant === 'admin' ? 'var(--primary)' : 'var(--success)'};
  color: white;
  font-weight: 500;
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 3rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AnimationContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  text-align: left;
`;

const FeatureTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI-Powered Proctoring',
      description: 'Advanced facial recognition and behavior analysis to ensure exam integrity.',
      icon: '🤖'
    },
    {
      title: 'Real-time Monitoring',
      description: 'Instant alerts for suspicious activities and multiple face detection.',
      icon: '👁️'
    },
    {
      title: 'Secure Environment',
      description: 'Full-screen mode enforcement and tab switching prevention.',
      icon: '🔒'
    }
  ];

  return (
    <LandingContainer>
      <NavBar>
        <LoginButton
          variant="student"
          onClick={() => navigate('/student-login')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiUser size={20} />
          Student Login
        </LoginButton>
        <LoginButton
          variant="admin"
          onClick={() => navigate('/admin-login')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiShield size={20} />
          Admin Login
        </LoginButton>
      </NavBar>

      <MainContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI-Powered Exam Proctoring
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Secure, intelligent, and reliable online examination platform with advanced proctoring capabilities
        </Subtitle>

        <AnimationContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Lottie animationData={proctorAnimation} loop={true} />
        </AnimationContainer>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <FeatureTitle>
                <span role="img" aria-label={feature.title}>{feature.icon}</span>
                {feature.title}
              </FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </MainContent>
    </LandingContainer>
  );
};

export default LandingPage; 