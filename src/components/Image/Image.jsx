import styles from "./Image.module.css"

import fallbackImage from '../../assets/fallback.jpg'

const Image = ({
  src = "",
  alt = 'Immagine',
  className = 'post-image',
  ...props
}) => {

  let imagePath = src? src : fallbackImage

  return (
    <div>
      <img
        src={imagePath}
        alt={alt}
        className={`${styles[className]}`}
        {...props}
      />
    </div>
  );
}

export default Image