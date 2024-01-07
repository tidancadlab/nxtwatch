import styled from "styled-components";

export const Main = styled.div`
  min-height: 100vh;
  margin: auto;
  max-width: 1920px;
  background-color: ${({ dark }) => dark && "#0f0f0f"};
  color: ${({ dark }) => dark && 'white'};
  padding: ${({ padding }) => padding || '16px'};
`;
export const Nav = styled.nav`
  padding: 16px;
  background-color: ${({ bg }) => bg};
`;
export const Logo = styled.img`
  height: 40px;
`;
export const Img = styled.img`
  max-width: 100%;
`;

export const Heading = styled.h1`
  color: ${({ color }) => color ? color : "#334155"};
`;
export const Container = styled.div`
  display: flex;
  flex-direction: ${({ row }) => row ? "row" : "column"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  gap: ${({ gap }) => gap || "4px"};
  background-color: ${({ bg }) => bg};
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
  box-shadow: ${({ dark }) => dark ? "none" : "1px 1px 30px gray"};
  padding: ${({ padding }) => padding || "32px"};
  border-radius: ${({ round }) => round || "8px"};
  background-color: ${({ dark }) => dark ? "black" : "white"} ;
`;
export const Field = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row && "row") || "column"};
  gap: 8px;
`;
export const Label = styled.label`
font-size: 14px;
`;
export const Input = styled.input`
  border: 1px solid #cbd5e1;
  outline: none;
  padding: 8px;
  border-radius: 4px;
  background-color: transparent;
  color: ${({ dark }) => dark && 'white'};
  font-size: 14px;
`;
export const Select = styled.select`
  border: 1px solid #cbd5e1;
  outline: none;
  padding: 8px;
  border-radius: 4px;
`;
export const Button = styled.button`
  border: none;
  outline: none;
  background-color:${({ bg }) => bg || "transparent"};
  color: ${({ color }) => color || "black"};
  font-weight: 600;
  cursor: pointer;
  align-self: ${({ position }) => position || "flex-start"};
`;
export const Text = styled.p`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size};
  font-family: ${({ family }) => family};
`;
export const ItemContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 16px;
`;
export const Item = styled.li`
  list-style: none;
  padding: 0;
  max-width: 600px;
  color: ${({ color }) => color};
`;
export const SideBar = styled.div`
  max-width: 160px;
  min-width: 160px;
  max-height: calc(100vh - 66px);
  width: 100%;
  align-self: flex-start;
  flex-grow: 1;
  background-color: ${({ bg }) => bg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
`;
export const BannerContainer = styled.div`
  background-image: url(${({ image }) => image});
  background-size: cover;
  width: 100%;
  aspect-ratio: 10/3;
  max-height: 221px;
  padding: 16px;
`;
export const SearchInput = styled.input`
  outline: none;
  border: none;
  padding: 4px;
  background-color: transparent;
  color: ${({ color }) => color};
  min-width: 250px;
`;
export const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center ;
  gap: 0 ;
  border: 1px solid ${({ borderColor }) => borderColor};
  align-self: flex-start;
`;