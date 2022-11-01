import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.video}>
      <video width={800} height={450} controls>
        <source src="https://haitran-swincoffee-demo.s3.ap-southeast-1.amazonaws.com/autoscaling-part-1.mov"></source>
      </video>
    </div>
  );
}
