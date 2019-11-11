import styled from "styled-components";
import noAvatar from "../../assets/no-avatar.png";

export const Commit = styled.a`
  margin: 0 auto;
  margin-top: 50px;
  padding: 10px;
  width: 500px;
  background-color: white;
  text-align: left;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.04);
  }

  @media screen and (max-width: 500px) {
    width: 90%;
    padding: 0.5rem;
  }
`;

export const Card = styled.div`
  overflow: hidden;
`;

export const Description = styled.div`
  margin-top: 5px;
  color: #636e72;
  width: inherit;

  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

export const Avatar = styled.div`
  margin-right: 10px;
  display: block;
  background-image: url(${noAvatar});
  background-size: contain;
  border-radius: 4px;
  width: 50px;
  height: 50px;

  img {
    width: 50px;
    border-radius: 4px;
  }

  @media screen and (max-width: 500px) {
    width: 40px;
    height: 40px;

    img {
      width: 40px;
    }

    margin: 0 5px;
  }
`;

export const Message = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  width: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
