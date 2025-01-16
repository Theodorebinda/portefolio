import React from "react";

interface SpotifyPlayerProps {
  playlistUrl: string; // Lien Spotify à intégrer
  width?: string; // Largeur du player
  height?: string; // Hauteur du player
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  playlistUrl,
  width = "100%",
  height = "100%",
}) => {
  return (
    <div style={{ borderRadius: "12px", overflow: "hidden " }}>
      <iframe
        // style={{ borderRadius: "12px" }}
        className="fixed top-50 right-20 w-48 h-48 hidden md:flex"
        src={playlistUrl}
        width={width}
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
