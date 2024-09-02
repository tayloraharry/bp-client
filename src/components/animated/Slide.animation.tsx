import { styled } from "@mui/material/styles";

interface SlideAnimationProps {
  /**
   * Duration (seconds) of the animation.
   * Default is 0.5 seconds.
   */
  duration?: number;

  /**
   * Delay in seconds before the animation starts.
   * Default is 0'.
   */
  delay?: number;

  /**
   * Direction of the animation. Determines the slide animation type:
   * - 'in-right' slides the element in from the right.
   * - 'out-right' slides the element out to the right.
   * - 'in-left' slides the element in from the left.
   * - 'out-left' slides the element out to the left.
   */
  direction?: "in-up" | "in-right" | "out-right" | "in-left" | "out-left";
}

const slideInRight = `
opacity :0;
  @keyframes slideInRight {
    from {
    opacity: 0;
      transform: translateX(50%);
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const slideInUp = `
transform: translateY(10px);
  @keyframes slideInUp {
    from {
    opacity: 0;
      transform: translateY(100px);
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const slideInLeft = `
  @keyframes slideInLeft {
    from {
      transform: translateX(-300%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const slideOutLeft = `
  @keyframes slideOutLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-300%);
    }
  }
`;

const slideOutRight = `
  @keyframes slideOutLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(300%);
    }
  }
`;

const SlideAnimation = styled("div")<SlideAnimationProps>(
  ({ duration = 0.5, delay = 0, direction}) => {
    let animation = "";

    switch (direction) {
      case "in-up":
        animation = `${slideInUp} animation: slideInUp ${duration}s ease-in-out ${delay}s forwards;`;
        break;
      case "in-right":
        animation = `${slideInRight} animation: slideInRight ${duration}s ease-in-out ${delay}s forwards;`;
        break;
      case "out-right":
        animation = `${slideOutRight} animation: slideOutRight ${duration}s ease-in-out ${delay}s forwards;`;
        break;
      case "in-left":
        animation = `${slideInLeft} animation: slideInLeft ${duration}s ease-in-out ${delay}s forwards;`;
        break;
      case "out-left":
        animation = `${slideOutLeft} animation: slideOutLeft ${duration}s ease-in-out ${delay}s forwards;`;
        break;
      default:
        break;
    }

    return `
      ${animation}
    `;
  }
);
export default SlideAnimation;
