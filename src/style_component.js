import styled from "styled-components";

export const Main = styled.div`
  min-height: 100vh;
  margin: auto;
  max-width: 1020px;
  background-color: ${({ dark }) => dark && "#0f0f0f"};
  color: ${({ dark }) => dark && 'white'};
  padding: ${({ padding }) => padding || '16px'};
`;
export const Nav = styled.nav`
  padding: 16px;
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
  box-shadow: ${({ dark }) => dark? "none" : "1px 1px 30px gray"};
  padding: ${({ padding }) => padding || "16px"};
  border-radius: ${({ round }) => round || "8px"};
  background-color: ${({ dark }) => dark ? "black" : "white"} ;
`;
export const Field = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row && "row") || "column"};
  gap: 8px;
`;
export const Label = styled.label`
`;
export const Input = styled.input`
  border: 1px solid #cbd5e1;
  outline: none;
  padding: 8px;
  border-radius: 4px;
  background-color: transparent;
  color: ${({ dark }) => dark && 'white'};
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0;
  flex-grow: 1;
  gap: 40px;
  max-width: 500px;
  margin: auto;
`;
export const Item = styled.li`
  list-style: none;
  padding: 0;
  max-width: 150px;
`;
