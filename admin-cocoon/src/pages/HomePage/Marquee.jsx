import React from 'react';

const Marquee = () => {
  const styles = {
    marquee: {
      position: 'relative',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: '100%',
      height: '80px', // Adjusted the height of the container to be smaller
      borderBottom: '2px solid #ddd',
    },
    marqueeContent: {
      display: 'inline-block',
      height: '100%',

    },
    marqueeImage: {
      marginRight: '115px', // Increased gap between images
      height: '65px', // Adjust the size of images to fit within the height of the container
      width: 'auto',  // Ensure images maintain their aspect ratio
      animation: 'marquee 40s linear infinite', // Adjusted for continuous scrolling
    },
  };

  return (
    <div style={styles.marquee}>
      <div style={styles.marqueeContent}>
        <img
          src="https://image.cocoonvietnam.com/uploads/home_marquee_b3a3a85ad5.svg"
          alt="Marquee Item"
          style={styles.marqueeImage}
        />
        <img
          src="https://image.cocoonvietnam.com/uploads/home_marquee_b3a3a85ad5.svg"
          alt="Marquee Item"
          style={styles.marqueeImage}
        />
        <img
          src="https://image.cocoonvietnam.com/uploads/home_marquee_b3a3a85ad5.svg"
          alt="Marquee Item"
          style={styles.marqueeImage}
        />
        {/* Duplicate the images for continuous scrolling */}
        <img
          src="https://image.cocoonvietnam.com/uploads/home_marquee_b3a3a85ad5.svg"
          alt="Marquee Item"
          style={styles.marqueeImage}
        />
        <img
          src="https://image.cocoonvietnam.com/uploads/home_marquee_b3a3a85ad5.svg"
          alt="Marquee Item"
          style={styles.marqueeImage}
        />
        <img
          src="https://image.cocoonvietnam.com/uploads/home_marquee_b3a3a85ad5.svg"
          alt="Marquee Item"
          style={styles.marqueeImage}
        />
      </div>
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(100%); /* Starts the content off-screen on the right */
            }
            100% {
              transform: translateX(-100%); /* Moves the content off-screen on the left */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Marquee;
