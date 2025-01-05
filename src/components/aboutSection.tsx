import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";

const AboutSection = () => {
  return (
    <Container className="flex justify-between items-center ">
      <Container>
        <Typography className="md:text-7xl font-bold mb-4">
          À Propos de Moi
        </Typography>
      </Container>
      <Container>
        <Typography className="text-lg text-center max-w-2xl">
          {
            " Je suis un développeur passionné par la création d'expériences utilisateur intuitives et engageantes. Avec une expertise endéveloppement web et mobile, je m'efforce de concevoir des solutions quiallient esthétique et fonctionnalité. Mon parcours m'a permis de travailler sur divers projets, où j'ai pu affiner mes compétences en UI/UX design, en accessibilité et en développement front-end."
          }
        </Typography>
      </Container>
    </Container>
  );
};

export default AboutSection;
