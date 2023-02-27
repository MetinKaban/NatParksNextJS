import styles from "./VideoScreen.module.css";

const sources = [
  "/videos/arches-national-park-41946.mp4",
  "/videos/grand-canyon-408.mp4",
  "/videos/mountains-40965.mp4",
  "/videos/yosemite-137788.mp4",
];

const VideoScreen = () => {
  return (
    <div className={styles.container}>
      <video className={styles.video} autoPlay muted loop>
        <source src="/videos/parkVids.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoScreen;
