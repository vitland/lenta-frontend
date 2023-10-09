import Styles from "./Loader.module.css"

function Loader() {
  return (
    <div className={Styles.loader}>
      <div className={Styles.loader__container}>
        <div className={Styles.loader__bar}></div>
        <div className={Styles.loader__bar}></div>
        <div className={Styles.loader__bar}></div>
        <div className={Styles.loader__bar}></div>
        <div className={Styles.loader__bar}></div>
        <div className={Styles.loader__ball}></div>
      </div>
    </div>
  );
}

export default Loader