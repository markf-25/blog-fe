import { Box } from "@mui/material";

const variantsStyles = {
  "comment-avatar": {
    height: 63,
    width: 63,
    borderRadius: "50%",
    objectFit: "cover",
  },
  "header-avatar": {
    height: 40,
    width: 40,
    border: "1px solid var(--image-border)",
    borderRadius: 2,
    objectFit: "cover",
  },
  avatar: {
    height: 200,
    width: 200,
    border: "2px solid var(--image-border)",
    borderRadius: 2,
    objectFit: "cover",
    transition: "box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: "4px 4px 12px rgba(0,0,0,0.4)",
    },
  },
  "post-image": {
    width: "50vw",
    height: "30vh",
    borderRadius: 1,
    objectFit: "cover",

    "@media (max-width:600px)": {
      width: "90vw",
      height: "20vh",
    },
  },
};

const Image = ({
  src = "",
  alt = "Immagine",
  variant = "post-image",
  ...props
}) => {
  const fallbackImage =
    "https://i.pinimg.com/564x/bf/c7/89/bfc78969a1d4026e4b7afd1dce0d7a42.jpg";

  const imagePath = src || fallbackImage;

  return (
    <Box
      component="img"
      src={imagePath}
      alt={alt}
      sx={{
        display: "block",
        ...variantsStyles[variant],
      }}
      {...props}
    />
  );
};

export default Image;
