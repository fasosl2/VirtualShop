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

export const ThumbnailWrapper = styled.div`
  position: relative;
  min-width: 50px;
  width: fit-content;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover {
    border-color: #007bff;
  }
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ThumbnailText = styled.span`
  display: block;
  width: 100%;  
  position: sticky;
  bottom: 2px;
  left: 2px;
  right: 2px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 4px;
  text-align: center;
`;
