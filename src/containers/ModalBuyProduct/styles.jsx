import styled from "styled-components";

export const ImageContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

export const ProductImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
`;

export const GalleryContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover {
    border-color: #007bff;
  }
`;