import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiShield, FiChevronDown } from 'react-icons/fi';
import Lottie from 'lottie-react';
import proctorAnimation from '../assets/ai-proctor.json';
import robotAnimation from '../assets/robot-animation.json';
import { useEffect, useRef, useState } from 'react';

// Particle component for the background lights
const Particle = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at center, var(--primary) 0%, transparent 70%);
  pointer-events: none;
  opacity: 0.8;
  box-shadow: 0 0 15px 3px var(--primary);
`;

const LandingContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  background-image: linear-gradient(to bottom, rgba(0,0,20,0.9), rgba(0,0,30,0.95));
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 3rem;
  background-color: rgba(var(--card-bg-rgb), 0.05);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text-primary);
  text-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5);
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary), #8a2be2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.5);
`;

const NavButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const LoginButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  background-color: ${props => props.variant === 'admin' 
    ? 'rgba(var(--primary-rgb), 0.8)' 
    : 'rgba(var(--success-rgb), 0.8)'};
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.5);
    background-color: ${props => props.variant === 'admin' 
      ? 'var(--primary)' 
      : 'var(--success)'};
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem 4rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const HeroSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  position: relative;
`;

const RobotAnimationContainer = styled(motion.div)`
  width: 300px;
  height: 300px;
  z-index: 5;
  filter: drop-shadow(0 0 30px rgba(var(--primary-rgb), 0.7));
  margin-bottom: -30px;
`;

const GlowingCircle = styled(motion.div)`
  position: absolute;
  top: 150px;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%);
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  background: linear-gradient(135deg, #ffffff 0%, #b8c7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(var(--primary-rgb), 0.3);
  font-weight: 800;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 0 auto 3.5rem;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const AnimationContainer = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  margin: 2rem auto 0;
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  gap: 8px;
  cursor: pointer;
`;

const FeaturesSection = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 6rem auto 0;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #b8c7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  width: 100%;
  position: relative;
  z-index: 3;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), #8a2be2);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(var(--primary-rgb), 0.2);
    
    &::before {
      opacity: 1;
    }
  }
`;

const FeatureIconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: rgba(var(--primary-rgb), 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-size: 1.05rem;
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const particlesContainerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const featuresRef = useRef(null);

  // Create particles - increased count to 120
  useEffect(() => {
    const particlesCount = 120;
    const newParticles = Array.from({ length: particlesCount }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 6 + 2,
      color: `hsl(${Math.random() * 60 + 200}, 100%, ${50 + Math.random() * 30}%)`,
      velocity: {
        x: Math.random() * 0.5 - 0.25,
        y: Math.random() * 0.5 - 0.25
      }
    }));
    setParticles(newParticles);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update particles based on mouse position
  useEffect(() => {
    if (particles.length === 0) return;

    const updateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Calculate distance from mouse
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply force inversely proportional to distance
          let newVelocityX = particle.velocity.x;
          let newVelocityY = particle.velocity.y;
          
          if (distance < 200) {
            const force = 0.5 * (1 - distance / 200);
            newVelocityX -= dx * force * 0.01;
            newVelocityY -= dy * force * 0.01;
          }
          
          // Apply velocity with boundaries
          let newX = particle.x + newVelocityX;
          let newY = particle.y + newVelocityY;
          
          // Bounce off walls
          if (newX < 0 || newX > window.innerWidth) {
            newVelocityX *= -1;
            newX = particle.x;
          }
          
          if (newY < 0 || newY > window.innerHeight) {
            newVelocityY *= -1;
            newY = particle.y;
          }
          
          // Add some random movement
          newVelocityX += (Math.random() - 0.5) * 0.05;
          newVelocityY += (Math.random() - 0.5) * 0.05;
          
          // Dampen velocity
          newVelocityX *= 0.98;
          newVelocityY *= 0.98;
          
          return {
            ...particle,
            x: newX,
            y: newY,
            velocity: {
              x: newVelocityX,
              y: newVelocityY
            }
          };
        })
      );
    };

    const animationId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationId);
  }, [particles, mousePosition]);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: 'AI-Powered Proctoring',
      description: 'Our advanced facial recognition and behavior analysis ensures exam integrity with continuous monitoring, detecting suspicious activities in real-time.',
      icon: '🤖'
    },
    {
      title: 'Real-time Monitoring',
      description: 'Receive instant alerts for suspicious activities and multiple face detection with comprehensive reporting and video playback capabilities.',
      icon: '👁️'
    },
    {
      title: 'Secure Environment',
      description: 'Full-screen mode enforcement, tab switching prevention, and encrypted data transmission ensure your exams remain secure and tamper-proof.',
      icon: '🔒'
    },
    {
      title: 'Seamless Integration',
      description: 'Easily integrate with existing LMS platforms, with support for multiple question formats and automated grading systems.',
      icon: '🔄'
    }
  ];

  return (
    <LandingContainer>
      <ParticlesContainer ref={particlesContainerRef}>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            style={{
              left: particle.x,
              top: particle.y,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle at center, ${particle.color} 0%, transparent 70%)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
            animate={{
              x: [0, Math.random() * 10 - 5],
              y: [0, Math.random() * 10 - 5],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </ParticlesContainer>

      <NavBar>
        <Logo>
          <LogoIcon>AI</LogoIcon>
          ProctorX
        </Logo>
        <NavButtons>
          <LoginButton
            variant="student"
            onClick={() => navigate('/student-login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiUser size={18} />
            Student Login
          </LoginButton>
          <LoginButton
            variant="admin"
            onClick={() => navigate('/admin-login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShield size={18} />
            Admin Login
          </LoginButton>
        </NavButtons>
      </NavBar>

      <MainContent>
        <HeroSection>
          {/* Robot Animation at the top */}
          <RobotAnimationContainer
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Lottie animationData={robotAnimation} loop={true} />
          </RobotAnimationContainer>
          
          {/* Glowing circle behind the robot */}
          <GlowingCircle
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            AI-Powered Exam Proctoring
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Secure, intelligent, and reliable online examination platform with advanced proctoring capabilities
            designed to maintain academic integrity in the digital age
          </Subtitle>

          <AnimationContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Lottie animationData={proctorAnimation} loop={true} />
          </AnimationContainer>

          <ScrollIndicator 
            onClick={scrollToFeatures}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span>Explore Features</span>
            <FiChevronDown size={24} />
          </ScrollIndicator>
        </HeroSection>

        <FeaturesSection ref={featuresRef}>
          <SectionTitle>Key Features</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <FeatureIconContainer>
                  <span role="img" aria-label={feature.title}>{feature.icon}</span>
                </FeatureIconContainer>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesSection>
      </MainContent>
    </LandingContainer>
  );
};

export default LandingPage;
