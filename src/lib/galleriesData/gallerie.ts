// Modifiez votre tableau de photos pour utiliser des clés
export interface GalleryPhoto {
  id: number;
  image: string;
  titleKey: string;
  descriptionKey: string;
}
export const photos: GalleryPhoto[] = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753789718/Portefolio/WhatsApp_Image_2025-07-29_at_12.47.40_ztgdjo.jpg",
    titleKey: "gallery.photos.1.title", // Clé de traduction
    descriptionKey: "gallery.photos.1.description", // Clé de traduction
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753788860/Portefolio/WhatsApp_Image_2025-07-29_at_12.32.56_psozxo.jpg",
    titleKey: "gallery.photos.2.title",
    descriptionKey: "gallery.photos.2.description",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753788860/Portefolio/WhatsApp_Image_2025-07-29_at_12.32.55_mtv4if.jpg",
    titleKey: "gallery.photos.3.title",
    descriptionKey: "gallery.photos.3.description",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753788866/Portefolio/IMG_20240716_162737_8_ipapu2.jpg",
    titleKey: "gallery.photos.4.title",
    descriptionKey: "gallery.photos.4.description",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753788862/Portefolio/IMG_20231005_113100_985_ejn6if.jpg",
    titleKey: "gallery.photos.5.title",
    descriptionKey: "gallery.photos.5.description",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753789719/Portefolio/20180210_105949_rundcs.jpg",
    titleKey: "gallery.photos.6.title",
    descriptionKey: "gallery.photos.6.description",
  },
];
