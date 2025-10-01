import styles from "./styles.module.css";

type StarReviewProps = {
  count: number;
};

function StarReview({ count }: StarReviewProps) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(<img key={i} className={styles.star} src="/star.png" alt="star" data-testid="stars-icon"/>);
  }

  return <div className={styles.content}>{stars}</div>;
}

export default StarReview;
