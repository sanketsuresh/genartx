import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";
import LazyLoad from "react-lazyload";

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.white};
  transition: opacity 0.3s ease;
  border-radius: 6px;
  justify-content: end;
  padding: 16px;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
`;

const Author = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.card_light};
  border-radius: 12px;
`;

const ImageCard = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  console.log("ImageCard item:", item); // Debugging log

  return (
    <LazyLoad height={200} offset={100} once>
      <Card>
        {!isLoaded && <Placeholder />}
        <img
          alt={item?.prompt}
          style={{
            borderRadius: "12px",
            width: "100%",
            display: isLoaded ? "block" : "none",
          }}
          src={item?.photo}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback-image.jpg"; // Use fallback image
          }}
        />
        <HoverOverlay>
          <Prompt>{item?.prompt}</Prompt>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Author>
              <Avatar sx={{ width: "32px", height: "32px" }}>
                {item?.name ? item.name[0] : "U"}
              </Avatar>
              {item?.name || "Unknown"}
            </Author>
            <DownloadRounded
              style={{ cursor: "pointer" }}
              onClick={() => FileSaver.saveAs(item?.photo, "download.jpg")}
            />
          </div>
        </HoverOverlay>
      </Card>
    </LazyLoad>
  );
};

export default ImageCard;
