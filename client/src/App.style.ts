import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #eee;
  margin: 5px 30px;
  border-radius: 10px;
  border: 2px dashed gray;
  padding: 6px 40px 14px;
`;

export const Header = styled.div`
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
  text-align: center;
`;

export const From = styled.form`
  display: flex;
  justify-content: space-evenly;
  padding: 30px 0 25px;

  @media (max-width: 420px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
  background-color: rgba(203, 235, 235, 0.412);
  border: none;
  border-bottom: 2px dashed gray;

  &:focus {
    outline: none;
  }

  @media (max-width: 420px) {
    margin: 10px 0;
  }
`;

export const Button = styled.button`
  color: white;
  background-color: rgba(14, 81, 133, 0.81);
  border-radius: 20px;
  width: 70px;
  font-size: 1rem;

  @media (max-width: 420px) {
    margin: 10px 0;
  }
`;

export const Report = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 15px;
  padding: 8px;
  background-color: #e8e6e6;
`;

export const Time = styled.span`
  font-size: 13.5px;
  color: #848383;
`;

export const Temp = styled.div`
  display: flex;
  justify-content: center;
`;

export const Degree = styled.div`
  font-size: 3rem;
  font-weight: 700;
  padding: 8px;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Data = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 50px;
  padding: 5px 10px 5px 5px;

  @media (max-width: 420px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Grid = styled.div`
  border-bottom: 2px dashed gray;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;
